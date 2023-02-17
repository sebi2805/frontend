import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardWrapper } from "../Dashboard/DashboardWrapper";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
export const Router: React.FC = () => {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <DashboardWrapper>
            <Home />
          </DashboardWrapper>
        }
      />
      <Route
        path={"/login"}
        element={
          <DashboardWrapper>
            <Login />
          </DashboardWrapper>
        }
      />
      <Route
        path={"/register"}
        element={
          <DashboardWrapper>
            <Register />
          </DashboardWrapper>
        }
      />
    </Routes>
  );
};
