import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardWrapper } from "../Dashboard/DashboardWrapper";
import { Default } from "../DefaultPages/Default";
import { NotFoundPage } from "../DefaultPages/NotFoundPage";
import { HistoryComponent } from "../History";
import { HomeComponent } from "../Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { SettingsComponent } from "../Settings";
import { ProtectedRoute } from "./ProtectedRoute";

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardWrapper>
            <Default />
          </DashboardWrapper>
        }
      />

      <Route
        path={"/home"}
        element={
          <DashboardWrapper>
            <ProtectedRoute>
              <HomeComponent />
            </ProtectedRoute>
          </DashboardWrapper>
        }
      />
      <Route
        path={"/history"}
        element={
          <DashboardWrapper>
            <ProtectedRoute>
              <HistoryComponent />
            </ProtectedRoute>
          </DashboardWrapper>
        }
      />
      <Route
        path={"/settings"}
        element={
          <DashboardWrapper>
            <ProtectedRoute>
              <SettingsComponent />
            </ProtectedRoute>
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

      <Route
        path="*"
        element={
          <DashboardWrapper>
            <NotFoundPage />
          </DashboardWrapper>
        }
      />
    </Routes>
  );
};
