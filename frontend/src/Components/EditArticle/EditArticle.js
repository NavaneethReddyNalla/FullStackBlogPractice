import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function EditArticle() {
  const { currentUser } = useSelector((state) => state.userLogin);
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const article = useLocation().state;

  const token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  async function handleFormSubmit(editedArticle) {
    article.dateOfModification = new Date();
    article.title = editedArticle.title;
    article.category = editedArticle.category;
    article.content = editedArticle.content;

    const res = await axiosWithToken.put(
      "http://localhost:5000/author/article",
      article
    );

    if (res.data.message === "Article Modified") {
      navigate(`/author/${currentUser.username}/article/${article.articleId}`, {
        state: res.data.payload,
      });
    } else {
      setErr(res.data.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-3 bg-info">
        <input
          className="form-control"
          type="text"
          defaultValue={article.title}
          {...register("title")}
          id="title"
          placeholder="title"
        />
        <select
          className="form-select"
          {...register("category")}
          defaultValue={article.category}
        >
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
          defaultValue={article.content}
        ></textarea>

        {err !== "" && <p className="lead fs-4 text-danger">{err}</p>}

        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditArticle;
