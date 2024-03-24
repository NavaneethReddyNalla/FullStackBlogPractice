import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WriteArticle() {
  const { currentUser } = useSelector((state) => state.userLogin);
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  async function handleFormSubmit(article) {
    article.articleId = Date.now();
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;

    const res = await axiosWithToken.post(
      "http://localhost:5000/author/new-article",
      article
    );

    if (res.data.message === "Article added") {
      navigate("../my-articles");
    } else {
      setErr(res.data.message);
    }

    return;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-3 bg-info">
        <input
          className="form-control"
          type="text"
          {...register("title")}
          id="title"
          placeholder="title"
        />
        <select className="form-select" {...register("category")}>
          <option selected disabled>
            Category
          </option>
          <option value="programming">Programming</option>
          <option value="aiml">AI and Machine Learning</option>
          <option value="other">Others</option>
        </select>

        <textarea
          className="form-control"
          {...register("content")}
          id="content"
          cols="30"
          rows="10"
          placeholder="Content..."
        ></textarea>

        {err !== "" && <p className="lead fs-4 text-danger">{err}</p>}

        <button className="btn btn-success" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default WriteArticle;
