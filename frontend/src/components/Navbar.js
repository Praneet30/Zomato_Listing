// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#2d3748', padding: '16px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.25rem' }}>Restaurants</Link>
                <Link to="/search-location" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.25rem' }}>Search by Location</Link>
             
            </div>
        </nav>
    );
};

export default Navbar;
