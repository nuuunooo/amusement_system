import { useNavigate, useLocation } from 'react-router-dom';

const EmployeeSideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleTabs = (path) => {
        navigate(path);
    };

    return (
        <div className="sidebar-nav">
            <div 
                className={`button ${location.pathname === "/employee-process" ? "active" : ""}`}
                id="ticketing"
                onClick={() => handleTabs("/employee-process")}
            >
                <p className="button-text">Ticketing</p>
            </div>
            <div 
                className={`button ${location.pathname === "/employee-history" ? "active" : ""}`}
                id="history"
                onClick={() => handleTabs("/employee-payment")}
            >
            <   p className="button-text">History</p>
            </div>
            <div 
                className={`button ${location.pathname === "/validate-ticket" ? "active" : ""}`}
                id="validate-ticket"
                onClick={() => handleTabs("/validate-ticket")}
            >
                <p className="button-text">Validate Ticket</p>
            </div>
            <div className="button">
            <p className="button-text">Logout</p>
            </div>
        </div>
    )
}

export default EmployeeSideBar