import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';


import Login from './pages/Login';
import Register from './pages/Register';
import ProblemSolvingDashboard from './pages/ProblemSolvingDashboard';

// Define your routes
const router = createBrowserRouter(
  [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register/> },
  { path: "/dashboard", element: <ProblemSolvingDashboard/> }
]

);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
