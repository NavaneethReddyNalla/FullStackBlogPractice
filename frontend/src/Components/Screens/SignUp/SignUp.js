import React from "react";
import { useForm } from "react-hook-form";

import "./SignUp.css";

function SignUp() {
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
            {...register("userType")}
            id="user"
            value="user"
            className="mx-1"
          />
          <label htmlFor="user" className="me-3">
            User
          </label>

          <input
            type="radio"
            {...register("userType")}
            id="author"
            value="author"
            className="mx-1"
          />
          <label htmlFor="user">Author</label>
        </div>

        <input
          type="text"
          className="form-control my-2"
          placeholder="Username"
          {...register("username")}
          id="username"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          id="password"
          className="form-control my-2"
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
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
