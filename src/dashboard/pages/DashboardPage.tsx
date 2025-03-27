import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startNewUser } from '../../store/users';

export const DashboardPage = () => {

  const { isSaving } = useAppSelector((state) => state.user); 
  const dispatch = useAppDispatch();

  const onClickNewUser = () => {

    dispatch(startNewUser({
      name: '',
      email: '',
      phone: '',
      entryDate: new Date(),
      exitDate: new Date(),
      department: '',
      staff: '',
    }));

  }

  return (

    // Crear un boton
    // Crear un boton que al hacer click llame a la funcion startNewUser
    <div>
      <h1>DashboardPage</h1>
      <button
      disabled={isSaving}
        className='btn btn-primary'
        onClick={onClickNewUser}
      >
        Crear usuario
      </button>
    </div>
  )
}
