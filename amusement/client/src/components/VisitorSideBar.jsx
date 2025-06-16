import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VisitorSideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleTabs = (path) => {
        navigate(path);
    };

    return (
        <div className="sidebar-nav">
            <div
                className={`button ${location.pathname === "/visitor-process" ? "active" : ""}`}
                id="ticketing"
                onClick={() => handleTabs("/visitor-process")}
            >
                <p className="button-text">Ticketing</p>
            </div>
            <div
                className={`button ${location.pathname === "/visitor-history" ? "active" : ""}`}
                id="history"
                onClick={() => handleTabs("/visitor-history")}
            >
                <p className="button-text">History</p>
            </div>
            <div className="button">
                <p className="button-text">Logout</p>
            </div>
        </div>
    );
};

export default VisitorSideBar;
