import { useNavigate } from "react-router-dom"

const AdminSideBar = () => {
    const navigate = useNavigate()

    const handleTabs = (path) => {
        navigate(path);
    };

    return (
        <div className="sidebar-nav">
            <div 
                className={`button ${location.pathname === "/admin-dashboard" ? "active" : ""}`}
                id="manage-visitors"
                onClick={() => handleTabs("/admin-dashboard")}
            >
                <p className="button-text">Manage Visitors</p>
            </div>
            <div 
                className={`button ${location.pathname === "/admin-manage-employee" ? "active" : ""}`}
                id="manage-employees"
                onClick={() => handleTabs("/admin-manage-employee")}
            >
                <p className="button-text">Manage Employees</p>
            </div>
            <div 
                className={`button ${location.pathname === "/admin-manage-ticket" ? "active" : ""}`} 
                id="manage-tickets"
                onClick={() => handleTabs("/admin-manage-ticket")}
            >
                <p className="button-text">Manage Tickets</p>
            </div>
            <div 
                className={`button ${location.pathname === "/admin-sales" ? "active" : ""}`} 
                id="sales-report"
                onClick={() => handleTabs("/admin-sales")}
            >
                <p className="button-text">Sales Report</p>
            </div>
            <div className="button">
                <p className="button-text">Logout</p>
            </div>
        </div>
    )
}

export default AdminSideBar