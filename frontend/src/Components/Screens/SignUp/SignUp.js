import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./SignUp.css";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [err, setError] = useState("");
  const navigate = useNavigate();

  async function onFormSubmit(userObj) {
    const userType = userObj.userType;
    const res = await axios.post(
      `http://localhost:5000/${userType}/user`,
      userObj
    );

    if (
      res.data.message === "User created" ||
      res.data.message === "Author created"
    ) {
      setError("");
      navigate("/signin");
    } else {
      setError(res.data.message);
    }
  }

  return (
    <div className="bg-primary background pt-5">
      <form className="px-5 py-2" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="py-2">
          <input
            type="radio"
            {...register("userType", { required: true })}
            id="user"
            value="user"
            className="mx-1"
          />
          <label htmlFor="user" className="me-3">
            User
          </label>

          <input
            type="radio"
            {...register("userType", { required: true })}
            id="author"
            value="author"
            className="mx-1"
          />
          <label htmlFor="user">Author</label>
          {errors.userType?.type === "required" && (
            <p className="lead text-danger">User type not selected</p>
          )}
        </div>

        <input
          type="text"
          className="form-control my-2"
          placeholder="Username"
          {...register("username", {
            required: true,
            minLength: 4,
            maxLength: 25,
          })}
          id="username"
        />
        {errors.username?.type === "required" && (
          <p className="lead text-danger">Username Required</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          id="password"
          className="form-control my-2"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          id="email"
          className="form-control my-2"
        />

        {err && <p className="text-danger lead">{err}</p>}

        <button type="submit" className="btn btn-success my-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
