import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setActiveUser, startDeletingUser } from "../../store/users";
import { User } from "../../interfaces/interfaces";
import { FaEdit, FaTrash } from "react-icons/fa";

const columnTitles: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  entryDate: "Entry Date",
  exitDate: "Exit Date",
  department: "Department",
  staff: "Staff",
};

const USERS_PER_PAGE = 20;

export const UserTable = () => {
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  if (users.length === 0) {
    return <p>No users to display.</p>;
  }

  const columns = Object.keys(users[0]).filter((key) => key !== "id");

  const handleEdit = (user: User) => {
    dispatch(setActiveUser(user));
    navigate(`/form?edit=1&id=${user.id}`);
  };

  const handleDeleteClick = (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingUser(userId));
        Swal.fire({
          title: "Deleted",
          text: "User has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            {columns.map((key) => (
              <th key={key}>{columnTitles[key] || key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={user.id || index}>
              <td>{(currentPage - 1) * USERS_PER_PAGE + index + 1}</td>
              {columns.map((key) => (
                <td key={key}>{(user as any)[key]}</td>
              ))}
              <td>
                <FaEdit
                  className="text-primary me-3 cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(user)}
                  title="Edit user"
                  size={18}
                />
                <FaTrash
                  className="text-danger cursor-pointer"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteClick(user.id!)}
                  title="Delete user"
                  size={18}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-3">
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};