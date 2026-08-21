import { createContext, useContext, useState, type ReactNode } from "react";
import { users, type User } from "../data/mockData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = sessionStorage.getItem("vms_user");
    return stored ? JSON.parse(stored) : null;
  });

  function login(email: string, password: string): boolean {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      sessionStorage.setItem("vms_user", JSON.stringify(found));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem("vms_user");
  }

  function updateUser(data: Partial<User>) {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    sessionStorage.setItem("vms_user", JSON.stringify(updated));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
