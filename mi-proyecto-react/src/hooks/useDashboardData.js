"use client"

import { useState, useEffect, useCallback } from "react"
import pb from "../services/pocketbase.js" // Asumo que esta ruta es correcta

const useDashboardData = () => {
  // 1. Estado simplificado para manejar todo junto
  const [data, setData] = useState({
    present: 0,
    total: 0,
    absences: 0,
    justifications: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Usamos useCallback para que la función no se recree innecesariamente
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // 2. CORRECCIÓN: Usamos los nombres de colección EXACTOS de tu PocketBase
      const [totalStudents, allTodayRecords, todayJustifications] = await Promise.all([
        pb.collection("students").getFullList(),
        pb.collection("attendance_management").getFullList({ filter: `created >= @today.start` }),
        pb.collection("management_of_justifications").getFullList({ filter: `created >= @today.start` }),
      ])

      // 3. CORRECCIÓN: Asumo que el campo se llama 'state' y el valor es 'present' o 'absent'
      const presentStudents = allTodayRecords.filter((record) => record.state === 'present').length
      const absentStudents = allTodayRecords.length - presentStudents

      setData({
        present: presentStudents,
        total: totalStudents.length,
        absences: absentStudents,
        justifications: todayJustifications.length,
      })
    } catch (err) {
      console.error("Error al obtener datos de PocketBase:", err)
      setError("No se pudieron cargar los datos.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 4. CORRECCIÓN: useEffect asíncrono para manejar suscripciones correctamente
  useEffect(() => {
    fetchDashboardData()

    let unsubscribeStudents, unsubscribeAttendances, unsubscribeJustifications;

    const setupSubscriptions = async () => {
      try {
        // Usamos 'await' y los nombres de colección correctos
        unsubscribeStudents = await pb.collection('students').subscribe('*', fetchDashboardData);
        unsubscribeAttendances = await pb.collection('attendance_management').subscribe('*', fetchDashboardData);
        unsubscribeJustifications = await pb.collection('management_of_justifications').subscribe('*', fetchDashboardData);
      } catch (error) {
        console.error("No se pudo suscribir a los cambios en tiempo real:", error);
      }
    }

    setupSubscriptions()

    // La función de limpieza se ejecutará cuando el componente se desmonte
    return () => {
      if (unsubscribeStudents) unsubscribeStudents();
      if (unsubscribeAttendances) unsubscribeAttendances();
      if (unsubscribeJustifications) unsubscribeJustifications();
    }
  }, [fetchDashboardData])

  return { data, isLoading, error, refreshData: fetchDashboardData }
}

export default useDashboardData