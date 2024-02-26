import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="bg-dark">
        <nav className="navbar navbar-expand">
          <ul className="navbar-nav">
            <li className="navbar-item mx-3">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-item mx-3">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="navbar-item mx-3">
              <Link to="/signin">Signin</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
