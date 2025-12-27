import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
