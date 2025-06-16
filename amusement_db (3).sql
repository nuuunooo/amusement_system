-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2025 at 01:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amusement_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminID` int(11) NOT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `EmployeeID` int(11) NOT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Username` int(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `AdminID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`EmployeeID`, `LastName`, `FirstName`, `Email`, `Username`, `Password`, `AdminID`) VALUES
(4, 'salaysay', 'kian', 'kian123@gmail.com', 0, '$2b$10$quLwKKVUFS22qzR9AbPYxu.Af1pQJ72j6WKCzXCdcJqGgxw1iFD2m', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `receipt`
--

CREATE TABLE `receipt` (
  `ReceiptID` int(11) NOT NULL,
  `TransactionID` int(11) DEFAULT NULL,
  `PaymentMethod` varchar(50) DEFAULT NULL,
  `IssuedBy` varchar(100) DEFAULT NULL,
  `PaymentDate` date DEFAULT NULL,
  `TotalAmount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receipt`
--

INSERT INTO `receipt` (`ReceiptID`, `TransactionID`, `PaymentMethod`, `IssuedBy`, `PaymentDate`, `TotalAmount`) VALUES
(1, 24, 'Gcash', '1', '2025-06-16', 6500.00),
(2, 25, 'Gcash', '1', '2025-06-16', 18000.00),
(3, 26, 'Gcash', '1', '2025-06-16', 18000.00),
(4, 27, 'Gcash', '1', '2025-06-16', 6500.00),
(5, 28, 'Gcash', '1', '2025-06-16', 1500.00),
(6, 29, 'Gcash', '1', '2025-06-16', 6500.00),
(7, 30, 'Gcash', 'Angelo Lee', '2025-06-16', 6500.00),
(8, 31, 'Gcash', 'Angelo Lee', '2025-06-16', 16700.00),
(9, 32, 'Gcash', 'Angelo Lee', '2025-06-16', 12200.00),
(10, 33, 'Gcash', 'Angelo Lee', '2025-06-16', 1500.00),
(11, 34, 'Gcash', 'Angelo Lee', '2025-06-16', 1500.00),
(12, 50, 'Gcash', 'Angelo Lee', '2025-06-17', 6500.00),
(13, 51, 'Gcash', 'Angelo Lee', '2025-06-17', 1500.00),
(14, 52, 'Gcash', 'Angelo Lee', '2025-06-17', 1500.00),
(15, 54, 'Gcash', 'Angelo Lee', '2025-06-17', 6500.00),
(16, 55, 'Gcash', 'Angelo Lee', '2025-06-17', 6500.00),
(17, 56, 'Gcash', 'Angelo Lee', '2025-06-17', 1200.00),
(18, 57, 'Gcash', 'Angelo Lee', '2025-06-17', 5000.00),
(19, 58, 'Gcash', 'Angelo Lee', '2025-06-17', 1500.00),
(20, 59, 'Gcash', 'Angelo Lee', '2025-06-17', 6500.00),
(21, 60, 'Gcash', 'Angelo Lee', '2025-06-17', 1500.00),
(22, 61, 'Gcash', 'justine mier', '2025-06-17', 1500.00);

-- --------------------------------------------------------

--
-- Table structure for table `tickettransaction`
--

CREATE TABLE `tickettransaction` (
  `TransactionID` int(11) NOT NULL,
  `VisitorID` int(11) DEFAULT NULL,
  `EmployeeID` int(11) DEFAULT NULL,
  `TransactionDate` date DEFAULT curdate(),
  `ReservedDate` date DEFAULT NULL,
  `SubtotalAmount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickettransaction`
--

INSERT INTO `tickettransaction` (`TransactionID`, `VisitorID`, `EmployeeID`, `TransactionDate`, `ReservedDate`, `SubtotalAmount`) VALUES
(15, 1, NULL, '2025-06-16', '2025-06-17', 1500.00),
(16, 1, NULL, '2025-06-16', '2025-06-17', 1500.00),
(17, 1, NULL, '2025-06-16', '2025-06-17', 1500.00),
(18, 1, NULL, '2025-06-16', '2025-06-20', 1500.00),
(19, 1, NULL, '2025-06-16', '2025-06-19', 1499.00),
(20, 1, NULL, '2025-06-16', '2025-06-19', 2998.00),
(21, 1, NULL, '2025-06-16', '2025-06-19', 6500.00),
(22, 1, NULL, '2025-06-16', '2025-06-18', 1500.00),
(23, 1, NULL, '2025-06-16', '2025-06-25', 6500.00),
(24, 1, NULL, '2025-06-16', '2025-06-18', 6500.00),
(25, 1, NULL, '2025-06-16', '2025-06-19', 18000.00),
(26, 1, NULL, '2025-06-16', '2025-06-19', 18000.00),
(27, 1, NULL, '2025-06-16', '2025-06-20', 6500.00),
(28, 1, NULL, '2025-06-16', '2025-06-20', 1500.00),
(29, 1, NULL, '2025-06-16', '2025-06-30', 6500.00),
(30, 1, NULL, '2025-06-16', '2025-06-19', 6500.00),
(31, 1, NULL, '2025-06-16', '2025-06-20', 16700.00),
(32, 1, NULL, '2025-06-16', '2025-06-20', 12200.00),
(33, 1, NULL, '2025-06-16', '2025-06-30', 1500.00),
(34, 1, NULL, '2025-06-16', '2025-06-30', 1500.00),
(50, 1, NULL, '2025-06-17', '2025-06-30', 6500.00),
(51, 1, NULL, '2025-06-17', '2025-06-30', 1500.00),
(52, 1, NULL, '2025-06-17', '2025-06-30', 1500.00),
(54, 1, NULL, '2025-06-17', '2025-06-30', 6500.00),
(55, 1, NULL, '2025-06-17', '2025-06-30', 6500.00),
(56, 1, NULL, '2025-06-17', '2025-06-30', 1200.00),
(57, 1, NULL, '2025-06-17', '2025-06-30', 5000.00),
(58, 1, NULL, '2025-06-17', '2025-06-30', 1500.00),
(59, 1, NULL, '2025-06-17', '2025-06-30', 6500.00),
(60, 1, NULL, '2025-06-17', '2025-06-30', 1500.00),
(61, 5, NULL, '2025-06-17', '2025-06-30', 1500.00);

-- --------------------------------------------------------

--
-- Table structure for table `tickettransactiondetail`
--

CREATE TABLE `tickettransactiondetail` (
  `DetailID` int(11) NOT NULL,
  `TransactionID` int(11) DEFAULT NULL,
  `TicketTypeId` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `UnitPrice` decimal(10,2) DEFAULT NULL,
  `LineTotal` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickettransactiondetail`
--

INSERT INTO `tickettransactiondetail` (`DetailID`, `TransactionID`, `TicketTypeId`, `Quantity`, `UnitPrice`, `LineTotal`) VALUES
(21, 21, 7, 1, 1500.00, 1500.00),
(22, 21, 8, 1, 5000.00, 5000.00),
(23, 22, 7, 1, 1500.00, 1500.00),
(24, 23, 7, 1, 1500.00, 1500.00),
(25, 23, 8, 1, 5000.00, 5000.00),
(26, 24, 7, 1, 1500.00, 1500.00),
(27, 24, 8, 1, 5000.00, 5000.00),
(28, 25, 7, 2, 1500.00, 3000.00),
(29, 25, 8, 3, 5000.00, 15000.00),
(30, 26, 7, 2, 1500.00, 3000.00),
(31, 26, 8, 3, 5000.00, 15000.00),
(32, 27, 7, 1, 1500.00, 1500.00),
(33, 27, 8, 1, 5000.00, 5000.00),
(34, 28, 7, 1, 1500.00, 1500.00),
(35, 29, 7, 1, 1500.00, 1500.00),
(36, 29, 8, 1, 5000.00, 5000.00),
(37, 30, 7, 1, 1500.00, 1500.00),
(38, 30, 8, 1, 5000.00, 5000.00),
(39, 31, 7, 1, 1500.00, 1500.00),
(40, 31, 8, 1, 5000.00, 5000.00),
(41, 31, 8, 2, 4500.00, 9000.00),
(42, 31, 7, 1, 1200.00, 1200.00),
(43, 32, 7, 1, 1500.00, 1500.00),
(44, 32, 8, 1, 5000.00, 5000.00),
(45, 32, 8, 1, 4500.00, 4500.00),
(46, 32, 7, 1, 1200.00, 1200.00),
(47, 33, 7, 1, 1500.00, 1500.00),
(48, 34, 7, 1, 1500.00, 1500.00),
(49, 50, 7, 1, 1500.00, 1500.00),
(50, 50, 8, 1, 5000.00, 5000.00),
(51, 51, 7, 1, 1500.00, 1500.00),
(52, 52, 7, 1, 1500.00, 1500.00),
(53, 54, 7, 1, 1500.00, 1500.00),
(54, 54, 8, 1, 5000.00, 5000.00),
(55, 55, 7, 1, 1500.00, 1500.00),
(56, 55, 8, 1, 5000.00, 5000.00),
(57, 56, 7, 1, 1200.00, 1200.00),
(58, 57, 8, 1, 5000.00, 5000.00),
(59, 58, 7, 1, 1500.00, 1500.00),
(60, 59, 7, 1, 1500.00, 1500.00),
(61, 59, 8, 1, 5000.00, 5000.00),
(62, 60, 7, 1, 1500.00, 1500.00),
(63, 61, 7, 1, 1500.00, 1500.00);

-- --------------------------------------------------------

--
-- Table structure for table `tickettype`
--

CREATE TABLE `tickettype` (
  `TicketTypeID` int(11) NOT NULL,
  `TypeName` varchar(50) DEFAULT NULL,
  `AdultPrice` decimal(10,2) DEFAULT NULL,
  `ChildPrice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickettype`
--

INSERT INTO `tickettype` (`TicketTypeID`, `TypeName`, `AdultPrice`, `ChildPrice`) VALUES
(7, 'One day Pass', 1500.00, 1200.00),
(8, 'One Year Pass', 5000.00, 4500.00);

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `VisitorID` int(11) NOT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `UserName` varchar(100) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`VisitorID`, `LastName`, `FirstName`, `Email`, `UserName`, `Password`) VALUES
(1, 'Lee', 'Angelo', 'angelolee@gmail.com', 'Angelo Lee', '$2b$10$IPODC255f0CrSj1zKuSOoeEewAjA7.9f0gpCy9PKByLlYO.3V8ecC'),
(5, 'mier', 'justine', 'wawawa@gmail.com', 'justine mier', '$2b$10$DRhi5gCA8Nhv6koa.8Fq4OMmPHjqaRsJ9zq1pwT1rD3dg.yg6VdVW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`EmployeeID`),
  ADD KEY `AdminID` (`AdminID`);

--
-- Indexes for table `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`ReceiptID`),
  ADD KEY `TransactionID` (`TransactionID`);

--
-- Indexes for table `tickettransaction`
--
ALTER TABLE `tickettransaction`
  ADD PRIMARY KEY (`TransactionID`),
  ADD KEY `VisitorID` (`VisitorID`),
  ADD KEY `EmployeeID` (`EmployeeID`);

--
-- Indexes for table `tickettransactiondetail`
--
ALTER TABLE `tickettransactiondetail`
  ADD PRIMARY KEY (`DetailID`),
  ADD KEY `TransactionID` (`TransactionID`),
  ADD KEY `TicketTypeId` (`TicketTypeId`);

--
-- Indexes for table `tickettype`
--
ALTER TABLE `tickettype`
  ADD PRIMARY KEY (`TicketTypeID`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`VisitorID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `receipt`
--
ALTER TABLE `receipt`
  MODIFY `ReceiptID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tickettransaction`
--
ALTER TABLE `tickettransaction`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `tickettransactiondetail`
--
ALTER TABLE `tickettransactiondetail`
  MODIFY `DetailID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `tickettype`
--
ALTER TABLE `tickettype`
  MODIFY `TicketTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `VisitorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`);

--
-- Constraints for table `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `receipt_ibfk_1` FOREIGN KEY (`TransactionID`) REFERENCES `tickettransaction` (`TransactionID`);

--
-- Constraints for table `tickettransaction`
--
ALTER TABLE `tickettransaction`
  ADD CONSTRAINT `tickettransaction_ibfk_1` FOREIGN KEY (`VisitorID`) REFERENCES `visitors` (`VisitorID`),
  ADD CONSTRAINT `tickettransaction_ibfk_2` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`);

--
-- Constraints for table `tickettransactiondetail`
--
ALTER TABLE `tickettransactiondetail`
  ADD CONSTRAINT `tickettransactiondetail_ibfk_1` FOREIGN KEY (`TransactionID`) REFERENCES `tickettransaction` (`TransactionID`),
  ADD CONSTRAINT `tickettransactiondetail_ibfk_2` FOREIGN KEY (`TicketTypeId`) REFERENCES `tickettype` (`TicketTypeID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
