import { BrowserRouter } from "react-router";
import Providers from "@/shared/contexts/providers";
import AppRouter from "./shared/routes/router";

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRouter />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
