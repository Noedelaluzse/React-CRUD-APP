import { collection, doc, setDoc } from "firebase/firestore/lite";
import { User } from "../../interfaces/interfaces";
import { AppDispatch, RootState } from "../store"; 
import { FirestoreDB } from "../../firebase/config";
import { addNewUser, savingNewUser, setActiveUser, setSaving, setUsers, updateUser } from "./userSlice";
import { loadUsers } from "../../helpers";

export const startNewUser = (user: User) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {

    dispatch(savingNewUser()); // Cambia el estado a "guardando"

    const { auth } = getState();
    const uid = auth.uuid;

    if (!uid) {
      console.error("No UID found in auth state.");
      return;
    }

    // Crear referencia sin especificar ID => Firebase lo genera automáticamente
    const userCollectionRef = collection(FirestoreDB, `${uid}`);
    const newDocRef = doc(userCollectionRef); // sin id = Firebase genera uno
    const generatedId = newDocRef.id;

    const newUser: User = {
      ...user,
      entryDate: user.entryDate || new Date().toISOString(),
      exitDate: user.exitDate || new Date().toISOString(),
      id: generatedId,
    };

    await setDoc(newDocRef, newUser); // guardar el documento con el ID generado

    dispatch(addNewUser(newUser)); // agregar el nuevo usuario al estado
    dispatch(setActiveUser(newUser)); // opcional: establecer el nuevo usuario como activo

  };
};

export const startLoadingUsers = () => {

  return async (dispatch: AppDispatch, getState: () => RootState) => {
    
    const { auth } = getState();
    const uid = auth.uuid;

    if (!uid) {
      console.error("No UID found in auth state.");
      return;
    }

    const users: User[] = await loadUsers(uid);

    dispatch(setUsers(users)); // Cargar los usuarios en el estado

  }

}

export const startUpdateNote = (user: User) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    
    dispatch(setSaving());

    const { auth } = getState();
    const uid = auth.uuid;

    if (!uid) {
      console.error("No UID found in auth state.");
      return;
    }

    const userCollectionRef = collection(FirestoreDB, `${uid}`);
    const userDocRef = doc(userCollectionRef, user.id);

    await setDoc(userDocRef, user, { merge: true });
    
    dispatch(updateUser(user)); // Actualizar el usuario en el estado

  }
}