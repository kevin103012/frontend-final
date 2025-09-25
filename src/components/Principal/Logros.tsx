import React, { useEffect, useState } from "react";
import "./Logros.css";

import Abecedario from "../../assets/insignia.png";
import Palabras from "../../assets/extrovertido.png";
import Matematica from "../../assets/idea.png";

interface Logro {
  id: number;
  categoria: string;
  completado: number;
  total: number;
  descripcion: string;
}

const imagenes: Record<string, string> = { // asocia categorías con imágenes :v
  Abecedario: Abecedario,
  Palabras: Palabras,
  Matematica: Matematica
};

const Logros: React.FC = () => {
  const [logros, setLogros] = useState<Logro[]>([]);

  useEffect(() => {
    const fetchLogros = async () => {
      const res = await fetch("http://localhost:8000/metricas");
      const data = await res.json();
      setLogros(data.progreso || data);
    };
    fetchLogros();
  }, []);

  return (
    <div className="logros-container">
      {logros.map((logro) => {
        const desbloqueado = logro.completado >= logro.total;

        return (
          <div
            key={logro.id}
            className={`logro-card ${desbloqueado ? "desbloqueado" : "bloqueado"}`}
          >
            <img
              src={imagenes[logro.categoria]}
              alt={logro.categoria}
              className={`logro-imagen ${desbloqueado ? "img-desbloqueado" : "img-bloqueado"}`}
            />

            <h2 className="h2-categoria">{logro.categoria}</h2>

            {desbloqueado ? (
              <>
                <p className="p-aviso">Completaste todos los retos de {logro.categoria}</p>
                <span className="estado">FELICIDADES </span>
              </>
            ) : (
              <>
                <p className="p-aviso">Completa todos los retos de {logro.categoria}</p>
                <span className="estado">BLOQUEADO </span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Logros;
