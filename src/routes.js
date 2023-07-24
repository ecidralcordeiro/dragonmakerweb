import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Login from "./components/pages/login/Login";
import Contact from "./components/pages/contact/Contact";
 
import PrivateRoute from "./PrivateRoute";
const Rotas = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          exact
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
          exact
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Rotas;
