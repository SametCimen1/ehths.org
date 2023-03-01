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
import Clubs from './routes/Clubs';
import ClubBig from './routes/ClubBig'
import Admin from './routes/Admin';
import Event from './routes/Event'


import Dm from './connect/dm'
import DmTalk from './connect/dmTalk'
import Groups from './connect/communities/communities'
import LongGroups from './connect/communities/comLong'
import MakeFriends from './connect/makeFriends'
// import Communicate from './communicate/communicate';
// import BigCommunicate from './communicate/bigCommunicate'

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
  },
  {
    path: "/clubs",
    element: <Clubs></Clubs>
  },
  {
    path: "/club/:id",
    element: <ClubBig></ClubBig>
  },
  {
    path: "/connect/dm",
    element: <Dm></Dm>
  },
  {
    path: "/connect/dm/to/:spacedName",
    element: <DmTalk></DmTalk>
  },
  // {
  //   path: "/connect/communicate",
  //   element: <Communicate></Communicate>
  // },
  // {
  //   path: "/connect/communicate/:id",
  //   element: <BigCommunicate></BigCommunicate>
  // },
 
  {
    path: "/communitie/:id",
    element: <LongGroups></LongGroups>
  }, 
  {
    path: "/connect/communities",
    element: <Groups></Groups>
  },
 
  {
    path: "/connect/makefriends",
    element: <MakeFriends></MakeFriends>
  },
  {
    path: "/admin",
    element: <Admin></Admin>
  },
  {
    path: "/event/:id",
    element: <Event></Event>
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
