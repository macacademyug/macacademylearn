import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, username: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCOUNTS_KEY = "@mac_academy_accounts";
const SESSION_KEY = "@mac_academy_session";

type AccountsMap = Record<string, { username: string; password: string }>;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const sessionRaw = await AsyncStorage.getItem(SESSION_KEY);
        if (sessionRaw) {
          const session = JSON.parse(sessionRaw) as User;
          setUser(session);
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const getAccounts = async (): Promise<AccountsMap> => {
    try {
      const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const signIn = async (email: string, password: string): Promise<string | null> => {
    const accounts = await getAccounts();
    const key = email.toLowerCase().trim();
    const account = accounts[key];
    if (!account) return "No account found with that email. Please sign up.";
    if (account.password !== password) return "Incorrect password.";
    const session: User = { email: key, username: account.username };
    setUser(session);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return null;
  };

  const signUp = async (email: string, username: string, password: string): Promise<string | null> => {
    const accounts = await getAccounts();
    const key = email.toLowerCase().trim();
    if (accounts[key]) return "An account with that email already exists. Please sign in.";
    const updated: AccountsMap = { ...accounts, [key]: { username: username.trim(), password } };
    await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updated));
    const session: User = { email: key, username: username.trim() };
    setUser(session);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return null;
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
