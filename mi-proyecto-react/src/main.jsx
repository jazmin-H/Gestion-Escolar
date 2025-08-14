// CRITERIO: Punto de entrada de la aplicación React
// Configura el renderizado principal y las dependencias globales
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

// CRITERIO: Renderizar la aplicación en el DOM
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
