import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { User } from "../../interfaces/interfaces";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { startNewUser, startUpdateNote } from "../../store/users";

const formData = {
  name: "",
  email: "",
  phone: "",
  entryDate: "",
  exitDate: "",
  department: "",
  staff: "",
};

export const UserFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSaving, active } = useAppSelector((state) => state.user);

  const queryParams = new URLSearchParams(location.search);
  const isEditing = queryParams.get("edit") === "1";
  const userId = queryParams.get("id");

  const {
    name,
    email,
    phone,
    entryDate,
    exitDate,
    department,
    staff,
    formState,
    onInputChange,
    updateForm,
  } = useForm<typeof formData>(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && userId) {
      dispatch(startUpdateNote({ id: userId, ...formState }));
      Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
    } else {
      const newUser: User = {
        name,
        email,
        phone,
        department,
        staff,
        entryDate: entryDate,
        exitDate: exitDate,
      };

      dispatch(startNewUser(newUser));

      Swal.fire("Creado", "Usuario creado correctamente", "success");
    }

    navigate("/dashboard");
  };

  useEffect(() => {
    if (isEditing && active) {
      updateForm({
        name: active.name,
        email: active.email,
        phone: active.phone,
        entryDate: active.entryDate.slice(0, 10),
        exitDate: active.exitDate.slice(0, 10),
        department: active.department,
        staff: active.staff,
      });
    }
  }, [isEditing, active]);

  return (
    <div className="container mt-4">
      <h3 className="text-center">{isEditing ? "Edit User" : "New User"}</h3>

      <div className="row mx-auto bg-white">
        <form
          className="col-6 mx-auto mt-5 p-4 border rounded shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="row">
            {/* Name */}
            <div className="col-12 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder={!isEditing ? "Enter visitor's name" : ""}
              />
            </div>

            {/* Email */}
            <div className="col-12 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder={!isEditing ? "email@example.com" : ""}
              />
            </div>

            {/* Phone */}
            <div className="col-12 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={phone}
                onChange={onInputChange}
                placeholder={!isEditing ? "Enter visitor's phone number" : ""}
              />
            </div>

            {/* Entry Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Entry Date</label>
              <input
                type="date"
                className="form-control"
                name="entryDate"
                value={entryDate}
                onChange={onInputChange}
              />
            </div>

            {/* Exit Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Exit Date</label>
              <input
                type="date"
                className="form-control"
                name="exitDate"
                value={exitDate}
                onChange={onInputChange}
              />
            </div>

            {/* Department */}
            <div className="col-12 mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                className="form-control"
                name="department"
                value={department}
                onChange={onInputChange}
                placeholder={!isEditing ? "Enter department" : ""}
              />
            </div>

            {/* Staff */}
            <div className="col-12 mb-3">
              <label className="form-label">Staff</label>
              <input
                type="text"
                className="form-control"
                name="staff"
                value={staff}
                onChange={onInputChange}
                placeholder={!isEditing ? "Enter name of person being visited" : ""}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button
              disabled={isSaving}
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
