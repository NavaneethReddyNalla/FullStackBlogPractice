import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userLoginSlice";

import "./Header.css";

function Header() {
  const { loginStatus } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  function logout() {
    sessionStorage.removeItem("token");

    const action = resetState();
    dispatch(action);
  }

  return (
    <div>
      <header className="bg-dark bg-gradient">
        <nav className="navbar navbar-expand">
          <ul className="navbar-nav ms-auto">
            {loginStatus === false ? (
              <>
                <li className="navbar-item mx-3">
                  <Link className="btn btn-info" to="/">
                    Home
                  </Link>
                </li>
                <li className="navbar-item mx-3">
                  <Link className="btn btn-info" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="navbar-item mx-3 me-5 ">
                  <Link className="btn btn-info" to="/signin">
                    Signin
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="btn btn-danger me-3" onClick={logout}>
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
