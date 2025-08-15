// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { pb } from '../services/pocketbase';

function Dashboard() {
  // El estado de tu app puede estar en español, es más claro para ti.
  const [asistencia, setAsistencia] = useState({ presentes: 0, total: 0 });
  const [ausentes, setAusentes] = useState(0);
  const [justificaciones, setJustificaciones] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- LÓGICA CON LOS NOMBRES CORRECTOS DE POCKETBASE ---
  const fetchData = async () => {
    // 1. Obtener el total de alumnos de la colección 'students'
    const totalAlumnos = await pb.collection('students').getFullList();

    // Filtro para obtener registros solo del día de hoy
    const hoy = new Date();
    // Ajuste para la zona horaria de Argentina (UTC-3)
    hoy.setHours(hoy.getHours() - 3);
    const inicioDelDia = new Date(hoy.setHours(0, 0, 0, 0)).toISOString().replace('T', ' ');
    const finDelDia = new Date(hoy.setHours(23, 59, 59, 999)).toISOString().replace('T', ' ');

    // 2. Obtener presentes de 'attendance_management'
    //    - La colección se llama 'attendance_management'
    //    - El campo que indica el estado es 'state'
    //    - El valor para presentes es 'present'
    const registrosPresentes = await pb.collection('attendance_management').getFullList({
      filter: `created >= "${inicioDelDia}" && created <= "${finDelDia}" && state = "present"`,
    });

    // 3. Obtener ausentes de 'attendance_management'
    //    - La colección es la misma: 'attendance_management'
    //    - El campo es 'state'
    //    - El valor para ausentes es 'absent'
    const registrosAusentes = await pb.collection('attendance_management').getFullList({
      filter: `created >= "${inicioDelDia}" && created <= "${finDelDia}" && state = "absent"`,
    });

    // 4. Obtener justificaciones de 'management_of_justifications'
    //    - La colección se llama 'management_of_justifications'
    const registrosJustificaciones = await pb.collection('management_of_justifications').getFullList({
      filter: `created >= "${inicioDelDia}" && created <= "${finDelDia}"`,
    });

    // Actualizamos el estado de React (esto puede estar en español)
    setAsistencia({ presentes: registrosPresentes.length, total: totalAlumnos.length });
    setAusentes(registrosAusentes.length);
    setJustificaciones(registrosJustificaciones.length);

    setLoading(false);
  };
  // ... el resto del componente (useEffect, return con el JSX) es exactamente igual ...

  useEffect(() => {
    fetchData();

    // Las suscripciones también deben usar los nombres EXACTOS de las colecciones
    pb.collection('attendance_management').subscribe('*', fetchData);
    pb.collection('management_of_justifications').subscribe('*', fetchData);

    return () => {
      pb.collection('attendance_management').unsubscribe();
      pb.collection('management_of_justifications').unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="loading">Cargando datos...</div>;
  }

  return (
    // ... aquí va todo el HTML/JSX sin cambios
    <div className="dashboard-container">
      <h1>Inicio</h1>
      <p className="subtitle">Resumen general del estado de las asistencias en tiempo real.</p>
      <div className="cards-grid">
        <div className="card">
          <p>Asistencia</p>
          <div className="data">
            <span className="presentes">{asistencia.presentes}</span>
            <span className="total">/{asistencia.total}</span>
          </div>
        </div>
        <div className="card">
          <p>Ausentes sin Justificar</p>
          <div className="data">
            <span>{ausentes}</span>
          </div>
        </div>
        <div className="card">
          <p>Justificaciones</p>
          <div className="data">
            <span>{justificaciones}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;