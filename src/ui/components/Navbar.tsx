import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startLogout } from '../../store/auth';


export const Navbar = () => {

    const dispatch = useAppDispatch();
    const { displayName } = useAppSelector((state) => state.auth); 

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                MacroPlay
            </Link>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                  <span className='nav-item nav-link text-primary'>
                    {displayName}
                  </span>

                  <button
                  className='nav-item nav-link btn'
                  onClick={onLogout}
                  >
                    Salir
                  </button>
                </ul>
            </div>
        </nav>
    )
}