import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    return (
        <nav className="navbar">
            <h1>My BookSelf</h1>
            <div className="toggle-button" onClick={toggleLinks}>
                <span>&#9776;</span>
            </div>
            <div className={`links ${showLinks ? 'show' : ''}`}>
                <Link to="/" onClick={toggleLinks}><strong>Search Books</strong></Link>
                <Link to="/bookshelf" onClick={toggleLinks}><strong>My Bookshelf</strong></Link>
            </div>
        </nav>
    );
};

export default Navbar;
