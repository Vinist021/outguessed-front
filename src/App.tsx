import { BrowserRouter } from "react-router";
import AppRouter from "./shared/routes/router";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
