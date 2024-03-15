import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Root from "./Components/Root/Root";
import Home from "./Components/Screens/Home/Home";
import SignIn from "./Components/Screens/SignIn/SignIn";
import SignUp from "./Components/Screens/SignUp/SignUp";
import UserProfile from "./Components/UserProfile/UserProfile";
import AuthorProfile from "./Components/AuthorProfile/AuthorProfile";
import Articles from "./Components/Articles/Articles";
import AuthorArticles from "./Components/AuthorArticles/AuthorArticles";
import WriteArticle from "./Components/WriteArticle/WriteArticle";
import ArticleById from "./Components/ArticleById/ArticleById";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "", element: <Home /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        {
          path: "user/:user",
          element: <UserProfile />,
          children: [
            { path: "", element: <Navigate to="articles" /> },
            { path: "articles", element: <Articles /> },
            { path: "article/:id", element: <ArticleById /> },
          ],
        },
        {
          path: "author/:author",
          element: <AuthorProfile />,
          children: [
            { path: "my-articles", element: <AuthorArticles /> },
            { path: "write-article", element: <WriteArticle /> },
            { path: "", element: <Navigate to="my-articles" /> },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
