import React from "react";
import Dashboard from "./pages/Dashboard";
import Missing from "./pages/Missing";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import Manage from "./pages/Manage";

const publicRoutes = [
  {
    path: "/",
    element: <MainLayout />,

    children:[
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/manage",
        element: <Manage />,
      },
    ],
  },
  {
    path: "*",
    element: <Missing />,
  },
];

const router = createBrowserRouter([...publicRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
