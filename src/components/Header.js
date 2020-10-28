import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand" to="/">PitaPal</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/home">Home</Link>
              <Link className="nav-item nav-link" to="/carts">Manage my Carts</Link>
              <Link className="nav-item nav-link" to="/menus">Manage my Menus</Link>
              <Link className="nav-item nav-link" to="/orders">Order Queue</Link>
              <button className="btn btn-primary" onClick={() => auth().signOut()}>Logout</button>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/login">Sign In</Link>
              <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;