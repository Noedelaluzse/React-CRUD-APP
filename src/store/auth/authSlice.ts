import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  uuid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

// Estado inicial tipado
const initialState: AuthState = {
  status: 'not-authenticated',
  uuid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

interface LoginPayload {
  uuid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action: PayloadAction<LoginPayload>) => {
        state.status = 'authenticated';
        state.uuid = action.payload.uuid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.photoURL = action.payload.photoURL;
        state.errorMessage = null;

      },
      logout: (state, action: PayloadAction<{ errorMessage?: string }>) => {
        state.status = 'not-authenticated';
        state.uuid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
        state.errorMessage = action.payload?.errorMessage || null;

      },
      checkingCredentials: (state) => {
        state.status = 'checking';
      }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;