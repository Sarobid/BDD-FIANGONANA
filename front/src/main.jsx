import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListeMpiangona from "./composants/ListeMpiangona";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/liste-mpiangona",
    element: <ListeMpiangona/>,
  },
  {
    path: "/dada",
    element: <div>way lelike</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
