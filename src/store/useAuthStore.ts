import create from 'zustand';

type AuthState={
    user:null | { id: number; username: string; isAdmin: boolean; };
    setUser:(user:AuthState['user'])=>void;
    logout:()=>void;
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