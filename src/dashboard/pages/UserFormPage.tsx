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

      dispatch(
        startNewUser(newUser)
      );

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