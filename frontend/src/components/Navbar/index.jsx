// src/components/landing-page/LandingPage.jsx
import React from 'react';
import './index.css';

const Navbar = () => {
    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="navbar-logo">Kings Hockey</div>
                <ul className="navbar-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#schedule">Schedule</a></li>
                    <li><a href="#gallery">Gallery</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
