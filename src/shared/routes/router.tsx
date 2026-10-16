import { Navigate, Route, Routes } from "react-router";
import Home from "@/modules/home/home";
import SignUp from "@/modules/auth/signUp";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
