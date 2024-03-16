import "./ArticleById.css";

import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function ArticleById() {
  const article = useLocation().state;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.userLogin);

  function goBack() {
    navigate("../articles");
  }

  function postComment(comment) {
    comment.username = currentUser.username;
    console.log(comment);
  }

  return (
    <>
      <button className="btn btn-danger ms-4 mt-5 back-button" onClick={goBack}>
        Back
      </button>
      <div className="text-start m-auto w-50 p-4 bg-white article">
        <h2>{article.title}</h2>
        <h5>- By {article.username}</h5>
        <h6>
          <i>{article.category}</i>
        </h6>
        <h6>
          <i>{article.dateOfModification}</i>
        </h6>
        <br />
        <p style={{ whiteSpace: "pre-line" }}>{article.content}</p>
      </div>

      <form onSubmit={handleSubmit(postComment)} className="bg-secondary mt-5">
        <input
          type="text"
          placeholder="Comment..."
          {...register("comment", { required: true })}
          className="form-control"
        />
        <button type="submit" className="btn btn-info">
          Post
        </button>
      </form>
    </>
  );
}

export default ArticleById;
