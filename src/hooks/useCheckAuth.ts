import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";


export const useCheckAuth = () => {
    const { status } = useAppSelector((state) => state.auth); 
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, async(user) => {
        if(!user) return dispatch(logout({}));
        const {uid,email, displayName, photoURL} = user;
        
        const userEmail = email ?? '';
        const userDisplayName = displayName ?? '';
        const userPhotoURL = photoURL ?? '';
  
        dispatch(login({
          uuid: uid,
          email: userEmail,
          displayName: userDisplayName,
          photoURL: userPhotoURL
        }));
  
      })
    }, []);

  return {
    status
  }
}
