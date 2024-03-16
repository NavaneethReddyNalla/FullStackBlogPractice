import "./ArticleById.css";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ArticleById() {
  const article = useLocation().state;
  const navigate = useNavigate();

  function goBack() {
    navigate("../articles");
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
        <p>{article.content}</p>
      </div>
    </>
  );
}

export default ArticleById;
