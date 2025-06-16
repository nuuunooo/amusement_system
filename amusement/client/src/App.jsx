import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProcessPage from './pages/ProcessPage.jsx'
import './App.css'
import Payment from './pages/Payment.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import EmployeeProcessPage from './pages/EmployeeProcessPage.jsx'
import EmployeePaymentPage from './pages/EmployeePayment.jsx'
import EmployeeHistoryPage from './pages/EmployeeHistoryPage.jsx'
import TicketValidation from './pages/TicketValidation.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminManageEmployees from './pages/AdminManageEmployee.jsx'
import AdminManageTickets from './pages/AdminManageTickets.jsx'
import SignupForm from './pages/SignupForm.jsx'
import LoginForm from './pages/LoginForm.jsx'
import { ProcessProvider } from './context/processContext.jsx'
import AdminSales from './pages/AdminSales.jsx'
import EmployeeRegistration from './pages/EmployeeRegistration.jsx'

function App() {
  return (
    <ProcessProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/visitor-process' element={<ProcessPage />} />
          <Route path='/visitor-history' element={<HistoryPage />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/employee-process' element={<EmployeeProcessPage />} />
          <Route path='/employee-payment' element={<EmployeePaymentPage />} />
          <Route path='/employee-history' element={<EmployeeHistoryPage />} />
          <Route path='/validate-ticket' element={<TicketValidation />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin-manage-employee' element={<AdminManageEmployees />} />
          <Route path='/admin-manage-ticket' element={<AdminManageTickets />} />
          <Route path='/admin-sales' element={<AdminSales />} />
          <Route path='/admin-add-employee' element={<EmployeeRegistration />} />
        </Routes>
      </Router>
    </ProcessProvider>
  )
}

export default App