import { createContext } from "react";
import type { AuthUser, LoginCredentials } from "./auth.types";

type AuthContextValue = {
  state: { user: AuthUser | null };
  methods: {
    login: (credentials: LoginCredentials) => boolean;
    logout: () => void;
  };
};

export const AuthContext = createContext<AuthContextValue | null>(null);
