import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      status: 'loading',
      setUser: (user) => set({ user, status: user ? 'authenticated' : 'unauthenticated' }),
      clearUser: () => set({ user: null, status: 'unauthenticated' }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
