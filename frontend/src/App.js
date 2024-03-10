import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root/Root";
import Home from "./Components/Screens/Home/Home";
import SignIn from "./Components/Screens/SignIn/SignIn";
import SignUp from "./Components/Screens/SignUp/SignUp";
import UserProfile from "./Components/UserProfile/UserProfile";
import AuthorProfile from "./Components/AuthorProfile/AuthorProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/user/:user", element: <UserProfile /> },
        { path: "/author/:author", element: <AuthorProfile /> },
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
