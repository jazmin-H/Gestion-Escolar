"use client"

// CRITERIO: Componente principal que define la estructura y navegación de la aplicación
// Integra todas las pantallas y proporciona la base para el sistema de asistencias
import { useState } from "react"
import Dashboard from "./pages/Dashboard.jsx"
import ManageAttendance from "./pages/ManageAttendance.jsx"
import ManageJustifications from "./pages/ManageJustifications.jsx"

const App = () => {
  // Estado para manejar la navegación entre pantallas
  const [currentPage, setCurrentPage] = useState("dashboard")

  // Función para renderizar la pantalla actual
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "attendance":
        return <ManageAttendance />
      case "justifications":
        return <ManageJustifications />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="App">
      {/* CRITERIO: Navegación simple para cambiar entre pantallas */}
      <nav className="bg-white shadow-sm border-b border-gray-200 mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${currentPage === "dashboard"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setCurrentPage("attendance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${currentPage === "attendance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              Gestión de Asistencia
            </button>
            <button
              onClick={() => setCurrentPage("justifications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${currentPage === "justifications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              Gestión de Justificaciones
            </button>
          </div>
        </div>
      </nav>

      {/* CRITERIO: Renderizar la pantalla actual */}
      {renderCurrentPage()}
    </div>
  )
}

export default App
