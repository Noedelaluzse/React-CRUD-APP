import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "../../interfaces/interfaces";


const initialState: UserState = {
  isSaving: false,
  messageSaved: '',
  users: [],
  active: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    savingNewUser: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.active = null;
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.isSaving = false;
      state.messageSaved = `${action.payload.name} added successfully`;
      state.active = null;
    },
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.isSaving = false;
      state.messageSaved = '';
      state.active = null;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      state.active = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload };
        state.isSaving = false;
        state.messageSaved = `${action.payload.name} updated successfully`;
        state.active = null;
      }
    },
    clearUsersLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.users = [];
      state.active = null;
    },
    deleteUserById: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  }
});

export const { addNewUser, setActiveUser, setUsers, setSaving, updateUser, deleteUserById, savingNewUser,clearUsersLogout } = userSlice.actions;