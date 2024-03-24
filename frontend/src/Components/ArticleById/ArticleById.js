import "./ArticleById.css";

import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ArticleById() {
  const article = useLocation().state;
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.userLogin);

  const token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  function goBack() {
    if (currentUser.userType === "user") navigate("../articles");
    else navigate("../my-articles");
  }

  async function postComment(comment) {
    comment.username = currentUser.username;

    const res = await axiosWithToken.post(
      `http://localhost:5000/user/comment/${article.articleId}`,
      comment
    );

    if (res.data.message !== "Comment added") {
      setErr("Error Adding the Comment");
      console.log(res.data.message);
    } else {
      setSuccess(res.data.message);
      article.comments.push(comment);
    }
  }

  async function deleteArticle() {
    const id = article.articleId;
    const res = await axiosWithToken.delete(
      `http://localhost:5000/author/article/${id}`
    );

    if (res.data.message === "Article Deleted") {
      navigate("../my-articles");
    }
  }

  return (
    <>
      <button className="btn btn-danger ms-4 mt-5 back-button" onClick={goBack}>
        Back
      </button>
      {currentUser.userType === "author" && (
        <div className="author-panel">
          <button onClick={navigate("../edit-article", { state: article })}>
            <FaEdit />
          </button>
          <button onClick={deleteArticle}>
            <MdDelete />
          </button>
        </div>
      )}

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

      {currentUser.userType === "user" && (
        <form
          onSubmit={handleSubmit(postComment)}
          className="bg-secondary mt-5"
        >
          <input
            type="text"
            placeholder="Comment..."
            {...register("comment", { required: true })}
            className="form-control"
          />
          {errors.comment?.type === "required" && (
            <p className="text-danger lead fs-5">Comment can't be empty</p>
          )}
          <button type="submit" className="btn btn-info">
            Post
          </button>
          {success !== "" && (
            <p className="text-success lead fs-5">{success}</p>
          )}
          {err !== "" && <p className="text-danger lead fs-5">{err}</p>}
        </form>
      )}

      <h4 className="mt-5">Comments:</h4>
      {article.comments.length === 0 && <p>No Comments Found</p>}
      {article.comments.map((comment) => {
        return (
          <div className="mb-5 comment">
            <h5>{comment.username}</h5>
            <h6>
              <pre>{comment.comment}</pre>
            </h6>
          </div>
        );
      })}
    </>
  );
}

export default ArticleById;
