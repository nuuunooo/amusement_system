import axios from 'axios'

const API_URL = "http://localhost:5000/api";

export async function loginUser(loginData) {
    try {
        const results = await axios.post(`${API_URL}/login`, loginData);
        return results.data;
    } catch (err) {
        throw err;
    }
}

export async function signupUser(signupData) {
    try {
        const results = await axios.post(`${API_URL}/register`, signupData);
        console.log(results.data)
        return results.data
    } catch (err) {
        throw err;
    }
}

export async function getTickets() {
    try {
        const results = await axios.get(`${API_URL}/getTickets`);
        console.log(results.data)
        return results.data;
    } catch (err) {
        throw err;
    }
}

export async function placeOrder(reservationDate, subTotal, ticketDetails) {
    const user = JSON.parse(localStorage.getItem("user"))

    const apiData = {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        },
        reservationDate, 
        subTotal,
        ticketDetails
    }

    try {
        const result = await axios.post(`${API_URL}/reserveTicket`, apiData);
        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function getAllVisitors() {
    try {
        const results = await axios.get(`${API_URL}/visitors`);
        return results.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteVisitor(visitorId) {
    try {
        const results = await axios.delete(`${API_URL}/visitors/${visitorId}`);
        return results.data;
    } catch (err) {
        throw err;
    }
}

export async function getAllEmployees() {
    try {
        const results = await axios.get(`${API_URL}/employees`);
        return results.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteEmployee(employeeId) {
    try {
        const results = await axios.delete(`${API_URL}/employees/${employeeId}`);
        return results.data;
    } catch (err) {
        throw err;
    }
}

export async function addEmployee(employeeData) {
    try {
        const result = await axios.post(`${API_URL}/employees`, employeeData);
        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function addTicketType(typeName, adultPrice, childPrice) {
    try {
        const result = await axios.post(`${API_URL}/tickettypes`, { typeName, adultPrice, childPrice });
        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function deleteTicketType(ticketTypeId) {
    try {
        const result = await axios.delete(`${API_URL}/tickettypes/${ticketTypeId}`);
        return result.data;
    } catch (err) {
        throw err;
    }
}

export async function getReceipts(visitorId) {
    const res = await axios.get(`${API_URL}/receipts/${visitorId}`);
    return res.data;
}

export async function getSalesSummary() {
    try {
        const res = await axios.get(`${API_URL}/sales-summary`);
        return res.data;
    } catch (err) {
        throw err;
    }
}