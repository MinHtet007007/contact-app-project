import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Routeguard from "../components/Routeguard";
import CreateContact from "../components/CreateContact";
import Userinfo from "../components/Userinfo";
import UpdateContact from "../components/UpdateContact";

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
        <Route
          path="/create"
          element={
            <Routeguard>
              <CreateContact />
            </Routeguard>
          }
        />
        <Route
          path="/update/:id"
          element={
            <Routeguard>
              <UpdateContact />
            </Routeguard>
          }
        />
        <Route
          path="/userinfo/:id"
          element={
            <Routeguard>
              <Userinfo />
            </Routeguard>
          }
        />
      </Routes>
    </div>
  );
};

export default Path;
