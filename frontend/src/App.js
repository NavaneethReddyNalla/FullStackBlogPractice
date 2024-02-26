import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root/Root";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <Root /> }]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
