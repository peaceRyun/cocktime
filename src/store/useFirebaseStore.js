import { create } from 'zustand';
import { db } from '../utils/firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const useFirebaseStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push({ id: doc.id, ...doc.data() });
      });
      set({ users: fetchedUsers, loading: false });
    } catch (e) {
      console.error("Error fetching users: ", e);
      set({ error: "Failed to fetch users", loading: false });
    }
  },

  addUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, "users"), userData);
      console.log("Document written with ID: ", docRef.id);
      set((state) => ({
        users: [...state.users, { id: docRef.id, ...userData }],
        loading: false,
      }));
      return docRef.id;
    } catch (e) {
      console.error("Error adding user: ", e);
      set({ error: "Failed to add user", loading: false });
      throw e; // Re-throw to allow component to handle
    }
  },

  // You can add more actions here for update, delete, etc.
}));

export default useFirebaseStore;
