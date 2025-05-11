import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    set({ user: null });
  },
}));
