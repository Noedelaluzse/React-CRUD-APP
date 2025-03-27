import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startLogout } from '../../store/auth';
import { FaSignOutAlt } from 'react-icons/fa'; // Icono para cerrar sesión

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { displayName } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
      <Link className="navbar-brand" to="/">
        MacroPlay
      </Link>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto align-items-center">
          <span className="nav-item nav-link text-white me-2">
            {displayName}
          </span>

          <button className="nav-item nav-link btn" onClick={onLogout} title="Logout">
            <FaSignOutAlt size={18} className="text-danger" />
          </button>
        </ul>
      </div>
    </nav>
  );
};