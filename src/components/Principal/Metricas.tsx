import React, { useEffect, useState } from "react";
import MetricaCard from "./MetricasCard";
import "./Metricas.css";

interface Metrica {
  categoria: string;
  total: number; 
  completado: number;
  descripcion: string;
}

const Metricas: React.FC = () => {
  const [metricas, setMetricas] = useState<Metrica[]>([]);

  useEffect(() => {
    const fetchMetricas = async () => {
      const res = await fetch("http://localhost:8000/metricas");
      const data = await res.json();
      console.log("Respuesta del backend:", data); 
      setMetricas(data.progreso); 
    };
    fetchMetricas();
  }, []);

  return (
    <div className="metricas-container">
      {metricas.map((m, index) => (
        <MetricaCard
          key={index}
          categoria={m.categoria}
          total={m.total}
          completado={m.completado}
          descripcion={m.descripcion}
        />
      ))}
    </div>
  );
};

export default Metricas;
