import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AuthorArticles() {
  const [articles, setArticles] = useState([]);
  const [err, setErr] = useState("");

  const { currentUser } = useSelector((state) => state.userLogin);

  const token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const getArticles = async () => {
    const res = await axiosWithToken.get(
      `http://localhost:5000/author/articles/${currentUser.username}`
    );

    if (res.data.message === "Articles") {
      setArticles(res.data.payload);
    } else {
      setErr(res.data.message);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      {err !== "" && <p>{err}</p>}
      {articles.length === 0 ? (
        <p>No Articles Published</p>
      ) : (
        articles.map((article) => <p>{article.title}</p>)
      )}
    </div>
  );
}

export default AuthorArticles;
