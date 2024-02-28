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
      <form>
        <div>
          <input type="radio" name="userType" id="user" />
          <label htmlFor="user">User</label>

          <input type="radio" name="userType" id="author" />
          <label htmlFor="user">Author</label>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
