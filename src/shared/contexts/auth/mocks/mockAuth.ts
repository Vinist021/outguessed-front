import type { AuthUser, LoginCredentials } from "../auth.types";

// Dados públicos de demonstração, usados somente no login simulado do frontend.
const demoCredentials: LoginCredentials = {
  email: "vinicius@teste.com",
  password: "123456",
};

const demoUser: AuthUser = {
  email: demoCredentials.email,
  name: "Vinicius",
  avatar: "/avatars/owl.svg",
};

export function authenticateMockUser(credentials: LoginCredentials): AuthUser | null {
  if (
    credentials.email !== demoCredentials.email ||
    credentials.password !== demoCredentials.password
  ) {
    return null;
  }

  return { ...demoUser };
}
