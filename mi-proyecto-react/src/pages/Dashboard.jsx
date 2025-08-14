import SummaryCard from "../components/dashboard/SummaryCard.jsx"
import useDashboardData from "../hooks/useDashboardData.js"

const Dashboard = () => {
  // CRITERIO: Utilizar hook personalizado para obtener datos del dashboard
  const { attendanceData, absencesData, justificationsData } = useDashboardData()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CRITERIO: Header con menú hamburguesa y notificaciones */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* CRITERIO: Contenido principal del dashboard */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* CRITERIO: Título y descripción del resumen */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inicio</h1>
          <p className="text-gray-600">Resumen general del estado de la asistencias en tiempo real</p>
        </div>

        {/* CRITERIO: Grid de tarjetas con métricas principales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* CRITERIO: Contador de Asistencia - proporción de presentes sobre total */}
          <SummaryCard
            title="Asistencia"
            value={attendanceData.loading ? "..." : `${attendanceData.present}/${attendanceData.total}`}
            subtitle={
              !attendanceData.loading
                ? `${Math.round((attendanceData.present / attendanceData.total) * 100)}% presente`
                : ""
            }
            isLoading={attendanceData.loading}
            colorClass="text-green-600"
          />

          {/* CRITERIO: Contador de Ausentes sin Justificar */}
          <SummaryCard
            title="Ausentes sin Justificar"
            value={absencesData.loading ? "..." : absencesData.count}
            subtitle={!absencesData.loading ? "estudiantes ausentes" : ""}
            isLoading={absencesData.loading}
            colorClass="text-red-600"
          />

          {/* CRITERIO: Contador de Justificaciones del día actual */}
          <SummaryCard
            title="Justificaciones"
            value={justificationsData.loading ? "..." : justificationsData.count}
            subtitle={!justificationsData.loading ? "justificaciones hoy" : ""}
            isLoading={justificationsData.loading}
            colorClass="text-blue-600"
          />
        </div>

        {/* CRITERIO: Información adicional sobre actualización en tiempo real */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-800">
              Los datos se actualizan automáticamente en tiempo real cuando se registran cambios en asistencias o
              justificaciones.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
