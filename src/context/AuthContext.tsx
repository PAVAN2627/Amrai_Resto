import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { mockSignIn, mockSignOut, getCurrentUser, MockUser } from '@/lib/mockAuth';

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => { error: string | null };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  function signIn(email: string, password: string): { error: string | null } {
    const { user, error } = mockSignIn(email, password);
    if (error) return { error };
    setUser(user);
    return { error: null };
  }

  function signOut() {
    mockSignOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
