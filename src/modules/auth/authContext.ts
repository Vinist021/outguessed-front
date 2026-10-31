import { createContext } from "react";

export type AuthUser = {
  email: string;
  name: string;
  avatar: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

type AuthContextValue = {
  state: { user: AuthUser | null };
  methods: { login: (credentials: LoginCredentials) => boolean };
};

export const AuthContext = createContext<AuthContextValue | null>(null);
