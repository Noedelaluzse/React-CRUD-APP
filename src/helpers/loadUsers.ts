import { collection, getDocs, Timestamp } from "firebase/firestore/lite";
import { FirestoreDB } from "../firebase/config";
import { User } from "../interfaces/interfaces";



export const loadUsers = async (uid: string): Promise<User[]> => {
  if (!uid) throw new Error("El UID del usuario no existe");

  const collectionRef = collection(FirestoreDB, `${uid}`);
  const snapshot = await getDocs(collectionRef);

  const users: User[] = [];

  snapshot.forEach(doc => {
    const data = doc.data();
  
    const user: User = {
      id: doc.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      staff: data.staff,
      // 🔧 conversión segura
      entryDate: data.entryDate instanceof Timestamp
        ? data.entryDate.toDate().toISOString()
        : data.entryDate,
      exitDate: data.exitDate instanceof Timestamp
        ? data.exitDate.toDate().toISOString()
        : data.exitDate,
    };
  
    users.push(user);
  });

  console.log(users);
  return users;
};