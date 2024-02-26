import React from "react";
import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <header className="bg-primary">
        <nav className="navbar">
          <Link className="navbar-toggler">Home</Link>
        </nav>
      </header>
      <Outlet />
      <footer></footer>
    </div>
  );
}

export default Root;
