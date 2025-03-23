import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import QueryProvider from "./components/QueryProvider"

import App from "$/App"
import "$/styles/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
)
