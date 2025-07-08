import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // your styles

function HomePage() {
  return (
    <div>
      {/* Navbar here */}
      <nav className="navbar">
        <div className="logo">Explore Kerala</div>
        <div className="nav-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signin" className="btn">Sign In</Link>
          <Link to="/loginadmin" className="btn">Admin Login</Link>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to Kerala</h1>
        <p>God's Own Country</p>
      </section>
    </div>
  );
}

export default HomePage;
