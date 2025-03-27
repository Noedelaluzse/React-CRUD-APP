import { useNavigate } from "react-router-dom";
import { UserTable } from "../components/UserTable";
import { FaPlus } from "react-icons/fa"; // Icono de suma para el FAB

export const DashboardPage = () => {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("/form?edit=0");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mb-4 mt-5">
        <div className="text-center">
          <h2 className="mb-0">Visitor Management</h2>
          <p className="text-muted">
            Track and manage all visitor entries efficiently
          </p>
        </div>
      </div>

      <UserTable />

      {/* FAB */}
      <button
        onClick={handleCreateUser}
        className="btn btn-primary rounded-circle position-fixed fab-button"
        title="Create new visit"
      >
        <FaPlus />
      </button>
    </>
  );
};
