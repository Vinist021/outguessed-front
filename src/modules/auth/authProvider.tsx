import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./authContext";
import type { AuthUser, LoginCredentials } from "./authContext";
import { authenticateMockUser } from "./mocks/user";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(credentials: LoginCredentials) {
    const authenticatedUser = authenticateMockUser(credentials);
    if (!authenticatedUser) return false;

    setUser(authenticatedUser);
    return true;
  }

  return <AuthContext value={{ state: { user }, methods: { login } }}>{children}</AuthContext>;
}
