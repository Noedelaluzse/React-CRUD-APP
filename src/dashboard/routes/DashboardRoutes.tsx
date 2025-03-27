import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { UserFormPage } from "../pages/UserFormPage";
import { Navbar } from "../../ui";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="form" element={<UserFormPage />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
      </div>
    </>
  );
};
