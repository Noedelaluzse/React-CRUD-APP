import { collection, doc, setDoc } from "firebase/firestore/lite";
import { User } from "../../interfaces/interfaces";

import { AppDispatch, RootState } from "../store"; 
import { FirestoreDB } from "../../firebase/config";
import { addNewUser, savingNewUser, setActiveUser } from "./userSlice";

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
      id: generatedId,
    };

    await setDoc(newDocRef, newUser); // guardar el documento con el ID generado

    dispatch(addNewUser(newUser)); // agregar el nuevo usuario al estado
    dispatch(setActiveUser(newUser)); // opcional: establecer el nuevo usuario como activo

  };
};