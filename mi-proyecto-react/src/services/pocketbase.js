// CRITERIO: Configuración del cliente PocketBase para comunicación con backend
// Este archivo centraliza la configuración de PocketBase para toda la aplicación
import PocketBase from "pocketbase"

// Configuración del cliente PocketBase
const pb = new PocketBase("http:// 10.236.135.22:8090") // Ajusta la URL según tu configuración

export default pb
