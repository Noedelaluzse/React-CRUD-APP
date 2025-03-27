import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { User } from "../../interfaces/interfaces";
import Swal from "sweetalert2";
import { useForm } from "../../hooks";
import { startNewUser } from "../../store/users";

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
  const { users, isSaving } = useAppSelector((state) => state.user);

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
  } = useForm<typeof formData>(formData);

  // Cargar datos si es edición
  useEffect(() => {
    if (isEditing && userId) {
      const userToEdit = users.find((u) => u.id === userId);
      if (userToEdit) {
        const { id, ...rest } = userToEdit;
      } else {
        Swal.fire("Error", "Usuario no encontrado", "error");
        navigate("/");
      }
    }
  }, [isEditing, userId, users, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && userId) {
      // dispatch(updateUser({ id: userId, ...payload }));
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

      dispatch(
        startNewUser(newUser)
      );

      Swal.fire("Creado", "Usuario creado correctamente", "success");
    }

    navigate("/dashboard");
  };



  return (
    <div className="container mt-4">
      <h3>{isEditing ? "Editar usuario" : "Nuevo usuario"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {Object.entries(formState).map(([key, value]) => (
            <div className="col-md-6 mb-3" key={key}>
              <label className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={key.toLowerCase().includes("date") ? "date" : "text"}
                className="form-control"
                name={key}
                value={value as string}
                onChange={onInputChange}
              />
            </div>
          ))}
        </div>

        <button 
          disabled={isSaving}
          type="submit" 
          className="btn btn-primary">
          {isEditing ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};