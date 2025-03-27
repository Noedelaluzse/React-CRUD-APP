export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  entryDate: Date;
  exitDate: Date;
  department: string;
  staff: string;
}

export interface UserState {
  isSaving: boolean;
  messageSaved: string;
  users: User[];
  active: User | null;
}