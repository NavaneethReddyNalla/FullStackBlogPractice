import React from "react";
import { useForm } from "react-hook-form";

import "./SignIn.css";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onFormSubmit(data) {
    console.log(data);
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
          <label htmlFor="user" className="me-3">
            Author
          </label>

          <input
            type="radio"
            {...register("userType", { required: true })}
            id="admin"
            value="admin"
            className="mx-1"
          />
          <label htmlFor="user">Admin</label>

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

        <button type="submit" className="btn btn-success my-2">
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
