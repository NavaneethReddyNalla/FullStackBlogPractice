import React from "react";
import { Outlet } from "react-router-dom";

import "./UserProfile.css";

function UserProfile() {
  return (
    <div className="text-center bg-primary user-profile">
      <Outlet />
    </div>
  );
}

export default UserProfile;
