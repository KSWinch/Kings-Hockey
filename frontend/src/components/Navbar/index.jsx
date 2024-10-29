import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo">Kings Hockey</div>
                <ul className="navbar-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/schedule">Schedule</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
