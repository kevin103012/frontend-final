import React from "react";

// 1. Define la interfaz con los tipos de las props
interface MetricaCardProps {
  icono: string;           
  Progreso: string;  
  Clase: string;     // Opcional (puede no pasarse)
}

// 2. Usa la interfaz en el componente
const MetricaCard: React.FC<MetricaCardProps> = ({
  icono,
  Progreso,
  Clase = "",
}) => {
  return (
    <div className={`progreso-card ${Clase}`}>
      <img
        src={icono}
        className="icono-imagen"
        
      />
      <p className="Proreso">{Progreso}</p>
    </div>
  );
};

export default MetricaCard;
