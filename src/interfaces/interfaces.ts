export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  entryDate: string;
  exitDate: string;
  department: string;
  staff: string;
}

export interface UserState {
  isSaving: boolean;
  messageSaved: string;
  users: User[];
  active: User | null;
}