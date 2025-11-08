import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types/auth.ts";
import { checkSessionValid, loginUsernamePassword } from "@/api/auth.ts";

const LOCAL_STORAGE_KEY = "auth-token";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    console.log("checking auth");

    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    // set authenticated right away to avoid login redirect when user request is pending
    setIsAuthenticated(true);

    checkSessionValid()
      .then((u) => {
        setUser(u);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
    // TODO: need server side support to delete session
  };

  const login = async (username: string, password: string) => {
    const userResult = await loginUsernamePassword(username, password);
    setUser(userResult.user);
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, userResult.token);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
