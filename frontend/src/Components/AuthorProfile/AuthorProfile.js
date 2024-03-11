import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./AuthorProfile.css";

function AuthorProfile() {
  return (
    <div className="text-center bg-primary author-profile">
      <nav>
        <NavLink className="btn btn-info me-3" to="my-articles">
          My Articles
        </NavLink>
        <NavLink className="btn btn-info" to="write-article">
          Write Article
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
