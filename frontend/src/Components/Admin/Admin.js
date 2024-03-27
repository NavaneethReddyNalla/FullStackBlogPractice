import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [articles, setArticles] = useState([]);
  const [err, setErr] = useState("");

  const token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const getArticles = async () => {
      const res = await axiosWithToken.get(
        "http://localhost:5000/user/articles"
      );

      if (res.data.message === "All Articles") {
        setArticles(res.data.payload);
      } else {
        setErr(res.data.message);
      }
    };

    getArticles();
  }, [axiosWithToken]);

  async function deleteArticle(article) {
    const id = article.articleId;
    const res = await axiosWithToken.delete(
      `http://localhost:5000/author/article/${id}`
    );

    if (res.data.message === "Article Deleted") {
      setArticles(articles.filter((article) => article.articleId !== id));
    }
  }

  return (
    <div className="container">
      {err !== "" && <p>{err}</p>}
      {articles.length === 0 ? (
        <p>No Articles Published</p>
      ) : (
        <div className="row row-col-3 p-5">
          {articles.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card mb-5" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <h6 className="card-subtitle mb-2">{article.username}</h6>
                  <p className="card-text">
                    {article.content.slice(0, 20) + "..."}
                  </p>
                  <button
                    className="btn btn-info"
                    onClick={() => deleteArticle(article)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
