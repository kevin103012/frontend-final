import React from "react";

interface MetricaCardProps {
  categoria: string;
  total: number; 
  completado: number;
  descripcion: string;
}

const MetricaCardProps: React.FC<MetricaCardProps> = ({

    categoria,
    total,
    completado,
    descripcion
}) => {
    return (
        <div className={`metrica-card ${categoria}`}>
            <p className="p-categoria">{categoria}</p>
            <p className="p-progreso">{completado}/{total}</p>
            <p className="p-descripcion">{descripcion}</p>
        </div>


    )
}

export default MetricaCardProps;