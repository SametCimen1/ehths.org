import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './routes/Home'
import Layout from './components/Layout'
import Signin from './routes/Signin'
import Signup from './routes/Signup'
import Dashboard from './routes/Dashboard'
import Profile from './routes/Profile'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/signin",
    element: <Signin></Signin>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },  
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>
  },
  {
    path: "/profile",
    element: <Profile></Profile>
  }
]); 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Layout>
    <RouterProvider router = {router}></RouterProvider>
  </Layout>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
