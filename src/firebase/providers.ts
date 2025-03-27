import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Google Sign-In
interface GoogleSignInSuccess {
  ok: true;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

interface GoogleSignInError {
  ok: false;
  errorCode?: string;
  errorMessage?: string;
}

// Email and password
interface RegisterUserPayload {
  email: string;
  password: string;
  displayName: string;
}


interface RegisterUserSuccess {
  ok: true;
  uuid: string;
  photoURL: string | null;
  displayName: string;
  email: string;
}

interface RegisterUserError {
  ok: false;
  errorMessage: string;
}

type RegisterUserResult = RegisterUserSuccess | RegisterUserError; // Email and password

type GoogleSignInResult = GoogleSignInSuccess | GoogleSignInError; // Google Sign-In

const googleProvider = new GoogleAuthProvider(); // Google Sign-In

export const signInWithGoogle = async (): Promise<GoogleSignInResult> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        ok: false,
        errorCode: (error as any).code,
        errorMessage: error.message,
      };
    }

    return {
      ok: false,
      errorMessage: "Unknown error occurred during Google Sign-In.",
    };
  }
};

export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}: RegisterUserPayload): Promise<RegisterUserResult> => {
  try {
    const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = res.user;

    // ✅ Actualizar el displayName en Firebase

    await updateProfile(FirebaseAuth.currentUser!, {
      displayName
    });

    return {
      ok: true,
      uuid: uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error: unknown) {
    // Type guard para errores
    if (error instanceof Error) {
      console.log(error);
      return { ok: false, errorMessage: error.message };
    }
    
    return { ok: false, errorMessage: "Unknown error while registering user." };
  }
};