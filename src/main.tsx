import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeColorProvider } from "@/contexts/ThemeColorContext"

createRoot(document.getElementById("root")!).render(
  <ThemeColorProvider>
    <App />
  </ThemeColorProvider>
);
