import { useNavigate } from "react-router-dom";
import { UserTable } from "../components/UserTable";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("/form?edit=0");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
        <button
          className="btn btn-primary"
          onClick={handleCreateUser}
        >
          Crear usuario
        </button>
      </div>

      <hr />

      <UserTable />
    </>
  );
};