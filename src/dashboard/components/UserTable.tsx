import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { setActiveUser, startDeletingUser } from '../../store/users';
import { User } from '../../interfaces/interfaces';

export const UserTable = () => {

  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (users.length === 0) {
    return <p>No hay usuarios para mostrar.</p>;
  }

  // Obtener las claves del primer usuario (sin el id)
  const columns = Object.keys(users[0]).filter((key) => key !== 'id');

  const handleEdit = (user: User) => {
    
    dispatch(setActiveUser(user));

    navigate(`/form?edit=1&id=${user.id}`);
  };

  const handleDeleteClick = (userId: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: dispatch(deleteUserById(userId));
        console.log('Eliminando usuario con ID:', userId);
        dispatch(startDeletingUser(userId));
        Swal.fire({
          title: 'Eliminado',
          text: 'El usuario ha sido eliminado correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            {columns.map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td>{index + 1}</td>
              {columns.map((key) => (
                <td key={key}>{(user as any)[key]}</td>
              ))}
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteClick(user.id!)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};