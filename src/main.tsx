import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { validateCriticalEnv } from "./config/env";

validateCriticalEnv();

createRoot(document.getElementById("root")!).render(<App />);
