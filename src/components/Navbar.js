import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Django React App</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/items">Items</Link>
        {isAuthenticated ? (
          <>
            <Link to="/items/create">Create Item</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;