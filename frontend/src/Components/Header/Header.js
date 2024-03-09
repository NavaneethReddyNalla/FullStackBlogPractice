import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userLoginSlice";

import "./Header.css";

function Header() {
  const { currentUser, loginStatus } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem("token");

    const action = resetState();
    dispatch(action);
    navigate("/");
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
                  <span className="lead fs-3 text-warning me-4">
                    {currentUser.username} <sup>{currentUser.userType}</sup>
                  </span>
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
