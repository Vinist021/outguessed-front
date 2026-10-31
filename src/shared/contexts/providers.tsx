import type { ReactNode } from "react";
import AuthProvider from "@/modules/auth/context/authProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
