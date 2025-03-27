import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { Navbar } from "../../ui";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
      </div>
    </>
  );
};
