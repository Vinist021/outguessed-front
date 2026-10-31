import type { ReactNode } from "react";
import AuthProvider from "@/shared/contexts/auth/authProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
