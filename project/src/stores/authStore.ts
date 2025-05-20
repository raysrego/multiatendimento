import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'agent';
  avatar?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
};

// For demo purposes - in a real app this would come from an API
const DEMO_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Supervisor',
    email: 'supervisor@example.com',
    password: 'super123',
    role: 'supervisor' as const,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Agent',
    email: 'agent@example.com',
    password: 'agent123',
    role: 'agent' as const,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });

    // Simulate API request
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const user = DEMO_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          const { password, ...userWithoutPassword } = user;
          set({
            isAuthenticated: true,
            user: userWithoutPassword,
            isLoading: false,
          });
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          set({ isLoading: false });
          resolve(false);
        }
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
  },

  checkAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      set({ isAuthenticated: true, user });
    }
  },
}));