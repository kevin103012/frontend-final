import React, { useEffect, useState } from "react";
import InfoCard from "./ProgresoCard";
import "./Progreso.css";

import Copa from "../../assets/copa.png";
import Target from "../../assets/target.png";
import Reloj from "../../assets/reloj.png";

interface Metrica {
  id: number;
  titulo: string;
  progreso: string;
  data: string;
}

const Dashboard: React.FC = () => {
  const [metricas, setMetricas] = useState<Metrica[]>([]);

  useEffect(() => {
    const fetchMetricas = async () => {
      const res = await fetch("http://localhost:8000/info");
      const data = await res.json();
      setMetricas(data);
    };

    fetchMetricas();
  }, []);

  // Array de íconos en el mismo orden que los IDs
  const iconos = [Copa, Target, Reloj];

  return (
    <div className="info-container">
      {metricas.map((m, index) => (
        <InfoCard
          key={m.id}
          icono={iconos[index]}  
          Progreso={m.progreso}
          Clase={m.data}
        />
      ))}
    </div>
  );
};

export default Dashboard;
