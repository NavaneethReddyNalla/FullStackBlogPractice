import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
      <footer></footer>
    </div>
  );
}

export default Root;
