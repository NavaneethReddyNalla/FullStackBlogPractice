import React from "react";
import { useForm } from "react-hook-form";

import "./SignUp.css";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="bg-primary background pt-5">
      <form className="px-5 py-2">
        <div className="py-2">
          <input type="radio" name="userType" id="user" />
          <label htmlFor="user">User</label>

          <input type="radio" name="userType" id="author" />
          <label htmlFor="user">Author</label>
        </div>

        <input
          type="text"
          className="form-control my-2"
          placeholder="Username"
          name=""
          id="username"
        />

        <input
          type="password"
          placeholder="Password"
          name=""
          id="password"
          className="form-control my-2"
        />

        <input
          type="email"
          placeholder="Email"
          name=""
          id="email"
          className="form-control my-2"
        />

        <button type="submit" className="btn btn-success my-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
