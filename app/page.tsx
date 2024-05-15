"use client";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { SessionProvider } from "next-auth/react";
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import AddUser from './components/addUser';
import AddCategory from './components/addCategory';

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    password: "",
  });
  const [categoryArray, setCategoryArray] = useState([]);

  return (
    <div>
      <SessionProvider>
      <Router>
        <Routes>
        <Route
            path="/"
            element={<Login  />}
          />
          <Route
            path="/register"
            element={<Register formData={formData} setFormData={setFormData} />}
          />
         
          <Route
            path="/dashboard"
            element={<Dashboard  />}
          />

          <Route
            path="/addUser"
            element={<AddUser formData={formData} setFormData={setFormData} categoryArray={categoryArray}/>}
          />

          <Route
            path="/addCategory"
            element={<AddCategory categoryArray={categoryArray} setCategoryArray={setCategoryArray} />}
          />
        </Routes>
      </Router>
      </SessionProvider>
    </div>
  );
}
