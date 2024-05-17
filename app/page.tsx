"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { SessionProvider } from "next-auth/react";
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import AddUser from './components/addUser';
import AddCategory from './components/addCategory';
import Profile from './components/profile';
import UserProfile from './components/userProfile';

export default function Home() {
  return (
    <div>
      <Router>
        <Routes>
        <Route
            path="/"
            element={<Login  />}
          />
          {/* <Route
            path="/register"
            element={<Register />}
          /> */}
         
          {/* <Route
            path="/dashboard"
            element={<Dashboard  />}
          />

          <Route
            path="/addUser"
            element={<AddUser  />}
          />

          <Route
            path="/addCategory"
            element={<AddCategory />}
          />

          <Route 
          path="/profile"
          element={<Profile />}
          /> */}

          {/* <Route
          path="/userProfile/:id"
          element={<UserProfile />}
          /> */}

        </Routes>
      </Router>
    </div>
  );
}
