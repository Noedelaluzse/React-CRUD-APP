import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { AppDispatch } from "../store"; // Ajusta la ruta si es necesario
import { checkingCredentials, login, logout } from "./authSlice";

interface RegisterUserPayload {
  email: string;
  password: string;
  displayName: string;
}

export const checkingAuthentication = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    const result =  await signInWithGoogle();

    if (!result.ok) return dispatch(logout({errorMessage: result.errorMessage}));

    dispatch(login({
      uuid: result.uid,
      email: result.email!,
      displayName: result.displayName!,
      photoURL: result.photoURL!
    }));

  };
}

export const startCreatingUserWithEmailPassword = (
  { email, password, displayName }: RegisterUserPayload
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({ email, password, displayName });

    if (!result.ok) {
      return dispatch(logout({ errorMessage: result.errorMessage }));
    }

    // ✅ Ahora sí puedes desestructurar con seguridad
    const { uuid, photoURL } = result;

    dispatch(login({
      uuid,
      email: result.email,
      displayName: result.displayName,
      photoURL,
    }));
  };
};

export const startLoginWithEmailPassword = (email: string, password: string) => {

  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword(email, password);

    if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

    dispatch(login({
      uuid: result.uuid,
      email: result.email,
      displayName: result.displayName,
      photoURL: result.photoURL,
    }));
  };
}

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {

    await logoutFirebase();
    dispatch(logout({}));

  };
};