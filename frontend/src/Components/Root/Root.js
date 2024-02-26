import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

import "./Root.css";

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
      <footer className="bg-dark bg-gradient"></footer>
    </div>
  );
}

export default Root;
