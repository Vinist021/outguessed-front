import { BrowserRouter } from "react-router";
import AuthProvider from "@/modules/auth/authProvider";
import AppRouter from "./shared/routes/router";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
