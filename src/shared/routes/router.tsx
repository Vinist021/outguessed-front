import { Navigate, Route, Routes } from "react-router";
import  Home  from "@/modules/home/home"

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
