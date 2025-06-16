const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "amusement_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err) => {
  if (err) console.log("Can't Connect to Database.", err);
  else console.log("Connecting Database Successfully.");
});

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });

  const fullName = username.split(" ");

  if (fullName.length < 2)
    return res
      .status(400)
      .json({ success: false, message: "Full name is required." });

  db.query(
    "SELECT EXISTS(SELECT 1 FROM visitors WHERE email = ?) AS userExists",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "Database Error." });

      if (results[0].userExists === 1)
        return res
          .status(409)
          .json({ success: false, message: "Email already in use." });

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO visitors (Username, LastName, FirstName, Email, Password) VALUES (?, ?, ?, ?, ?)",
        [
          username,
          fullName[1] || null,
          fullName[0] || null,
          email,
          hashedPassword,
        ],
        (err) => {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: "Registration Failed." });

          return res
            .status(201)
            .json({ success: true, message: "User Registered Successfully." });
        }
      );
    }
  );
});

app.post("/api/login", (req, res) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });

  let table;
  switch(role) {
    case "visitor":
      table = "visitors";
      break;
    case "employee":
      table = "employee";
      break;
    case "admin":
      table = "admin";
      break;
    default:
      return res.status(400).json({ success: false, message: "Invalid role." });
  }

  console.log(`Attempting login for role: ${role}, email: ${email}, table: ${table}`);

  db.query(
    `SELECT * FROM ${table} WHERE Email = ?`,
    [email],
    async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ success: false, message: "Database Error." });
      }

      console.log(`Query results for ${table}:`, results);

      if (results.length === 0)
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password." });

      const user = results[0];

      if (!(await bcrypt.compare(password, user.Password)))
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password." });

      const token = jwt.sign(
        {
          id: role === "visitor" ? user.VisitorID : 
             role === "employee" ? user.EmployeeID : 
             user.AdminID,
          username: user.Username || `${user.FirstName} ${user.LastName}`,
          email: user.Email,
          role: role
        },
        process.env.JWT_TOKEN,
        { expiresIn: "1h" }
      );

      const firstName = user.FirstName;
      const lastName = user.LastName;
      const id = role === "visitor" ? user.VisitorID : 
                role === "employee" ? user.EmployeeID : 
                user.AdminID;

      return res
        .status(200)
        .json({
          success: true,
          message: "Login successful.",
          token,
          firstName,
          lastName,
          id,
          role,
          email: user.Email
        });
    }
  );
});

app.get("/api/getTickets", (req, res) => {
  db.query("SELECT * FROM tickettype", (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Database error." });

    const tickets = results;

    return res
      .status(200)
      .json({
        success: true,
        message: "Ticket fetched successfully.",
        tickets,
      });
  });
});

app.post("/api/reserveTicket", (req, res) => {
  const { user, reservationDate, subTotal, ticketDetails } = req.body;

  if (!user || !reservationDate || !subTotal)
    return res
      .status(400)
      .json({ success: false, message: "Incomplete data." });

  let insertQuery, insertParams;
  if (user.role === "visitor") {
    insertQuery = "INSERT INTO tickettransaction (VisitorID, ReservedDate, SubtotalAmount) VALUES (?, ?, ?)";
    insertParams = [user.id, reservationDate, subTotal];
  } else if (user.role === "employee") {
    insertQuery = "INSERT INTO tickettransaction (EmployeeID, ReservedDate, SubtotalAmount) VALUES (?, ?, ?)";
    insertParams = [user.id, reservationDate, subTotal];
  } else {
    return res.status(400).json({ success: false, message: "Invalid user role for reservation." });
  }

  db.query(
    insertQuery,
    insertParams,
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Database error. transaction" });

      const transactionID = results.insertId;

      let completed = 0;
      let hasError = false;

      if (!ticketDetails || ticketDetails.length === 0) {
        return res.status(400).json({ success: false, message: "No ticket details provided." });
      }

      ticketDetails.forEach(ticket => {
        db.query(
          "INSERT INTO tickettransactiondetail (TransactionID, TicketTypeId, Quantity, UnitPrice, LineTotal) VALUES (?, ?, ?, ?, ?)",
          [
            transactionID,
            ticket.ticketTypeId,
            ticket.quantity,
            ticket.price,
            ticket.total,
          ],
          (err, result) => {
            if (hasError) return;
            if (err) {
              hasError = true;
              return res.status(500).json({ success: false, message: "Database error. detail" });
            }
            completed++;
            if (completed === ticketDetails.length) {
              // Insert receipt after all details are done
              const paymentMethod = req.body.paymentMethod || 'Gcash';
              const issuedBy = req.body.user.firstName + ' ' + req.body.user.lastName;
              db.query(
                "INSERT INTO Receipt (TransactionID, PaymentMethod, IssuedBy, PaymentDate, TotalAmount) VALUES (?, ?, ?, NOW(), ?)",
                [transactionID, paymentMethod, issuedBy, subTotal],
                (err, result) => {
                  if (err) {
                    return res.status(500).json({ success: false, message: "Database error. receipt" });
                  }
                  return res.status(201).json({ success: true, message: "Reservation successful." });
                }
              );
            }
          }
        );
      });
    }
  );
});

// Get all visitors and total count
app.get("/api/visitors", (req, res) => {
  db.query("SELECT * FROM visitors", (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error." });
    }
    db.query("SELECT COUNT(VisitorID) as total FROM visitors", (err2, countResults) => {
      if (err2) {
        return res.status(500).json({ success: false, message: "Database error." });
      }
      return res.status(200).json({
        success: true,
        visitors: results,
        total: countResults[0].total
      });
    });
  });
});

// Delete a visitor by ID
app.delete("/api/visitors/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM visitors WHERE VisitorID = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error." });
    }
    return res.status(200).json({ success: true, message: "Visitor deleted successfully." });
  });
});

// Get all employees and total count
app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error." });
    }
    db.query("SELECT COUNT(EmployeeID) as total FROM employee", (err2, countResults) => {
      if (err2) {
        return res.status(500).json({ success: false, message: "Database error." });
      }
      return res.status(200).json({
        success: true,
        employees: results,
        total: countResults[0].total
      });
    });
  });
});

// Delete an employee by ID
app.delete("/api/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employee WHERE EmployeeID = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error." });
    }
    return res.status(200).json({ success: true, message: "Employee deleted successfully." });
  });
});

// Add a new ticket type
app.post("/api/tickettypes", (req, res) => {
  const { typeName, adultPrice, childPrice } = req.body;
  if (!typeName || adultPrice == null || childPrice == null) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  db.query(
    "INSERT INTO tickettype (TypeName, AdultPrice, ChildPrice) VALUES (?, ?, ?)",
    [typeName, adultPrice, childPrice],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error." });
      }
      return res.status(201).json({ success: true, message: "Ticket type added successfully." });
    }
  );
});

// Delete a ticket type by ID
app.delete("/api/tickettypes/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tickettype WHERE TicketTypeID = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error." });
    }
    return res.status(200).json({ success: true, message: "Ticket type deleted successfully." });
  });
});

// Endpoint to get receipts for a visitor
app.get('/api/receipts/:visitorId', (req, res) => {
  const { visitorId } = req.params;
  db.query(
    `SELECT r.*, t.ReservedDate, t.SubtotalAmount, t.TransactionID
     FROM Receipt r
     JOIN tickettransaction t ON r.TransactionID = t.TransactionID
     WHERE t.VisitorID = ?`,
    [visitorId],
    (err, receipts) => {
      if (err) return res.status(500).json({ success: false, message: "Database error." });
      if (!receipts.length) return res.json({ success: true, receipts: [] });

      const receiptIds = receipts.map(r => r.TransactionID);
      db.query(
        `SELECT d.TransactionID, d.Quantity, d.UnitPrice, d.LineTotal, tt.TypeName
         FROM tickettransactiondetail d
         JOIN tickettype tt ON d.TicketTypeId = tt.TicketTypeID
         WHERE d.TransactionID IN (?)`,
        [receiptIds],
        (err2, details) => {
          if (err2) return res.status(500).json({ success: false, message: "Database error." });

          const detailsByTransaction = {};
          details.forEach(d => {
            if (!detailsByTransaction[d.TransactionID]) detailsByTransaction[d.TransactionID] = [];
            detailsByTransaction[d.TransactionID].push({
              type: d.TypeName,
              qty: d.Quantity,
              price: d.UnitPrice,
              lineTotal: d.LineTotal
            });
          });

          const receiptsWithDetails = receipts.map(r => ({
            ...r,
            ticketDetails: detailsByTransaction[r.TransactionID] || []
          }));
          
          return res.status(200).json({ success: true, receipts: receiptsWithDetails });
        }
      );
    }
  );
});

// Add a new employee
app.post("/api/employees", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  try {
    // Check if email already exists
    db.query("SELECT * FROM employee WHERE Email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ success: false, message: "Database error." });
      if (results.length > 0) {
        return res.status(409).json({ success: false, message: "Email already in use." });
      }
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO employee (FirstName, LastName, Email, Password, Username) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword, `${firstName} ${lastName}`],
        (err, result) => {
          if (err) {
            return res.status(500).json({ success: false, message: "Database error." });
          }
          return res.status(201).json({ success: true, message: "Employee added successfully." });
        }
      );
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

app.get("/api/sales-summary", (req, res) => {
  db.query(
    `SELECT 
      SUM(TotalAmount) AS totalSales,
      SUM(CASE WHEN YEAR(PaymentDate) = YEAR(CURDATE()) AND MONTH(PaymentDate) = MONTH(CURDATE()) THEN TotalAmount ELSE 0 END) AS monthlySales,
      SUM(CASE WHEN YEAR(PaymentDate) = YEAR(CURDATE()) THEN TotalAmount ELSE 0 END) AS annualSales
    FROM receipt`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error." });
      }
      return res.status(200).json({ success: true, ...results[0] });
    }
  );
});

app.listen(5000, () => {
  console.log("Server is running in port 5000.");
});
