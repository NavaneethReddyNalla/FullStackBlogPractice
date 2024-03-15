import React from "react";
import { useLocation } from "react-router-dom";

function ArticleById() {
  const article = useLocation().state;

  return (
    <div className="article">
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
  );
}

export default ArticleById;
