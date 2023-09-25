import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Routeguard from "../components/Routeguard";
import CreateContact from "../components/CreateContact";
import Userinfo from "../components/Userinfo";

const Path = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Routeguard>
              <Dashboard />
            </Routeguard>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/userinfo/:id" element={<Userinfo />} />
      </Routes>
    </div>
  );
};

export default Path;
