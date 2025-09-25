import React from "react";
import MetodosCard from "./MetodosCard";
import "./Metodos.css";
import { useNavigate } from "react-router-dom";

import Abecedario from "../../assets/alfabeto.png";
import Palabras from "../../assets/persona.png";
import Matematica from "../../assets/pensar.png";
import Entrenar from "../../assets/ml.png";

interface Metodo {
  icono: string;
  Metodo: string;
  ruta: string; 
  Clase: string;
}

const Metodos: React.FC = () => {
  const navigate = useNavigate();

  const metodos: Metodo[] = [
    {
      Metodo: "Abecedario",
      icono: Abecedario,
      ruta: "/Abecedario",
      Clase:"abecedario-card"
    },
    {
      Metodo: "Palabras",
      icono: Palabras,
      ruta: "/Palabras",
        Clase:"palabras-card"
    },
    {
      Metodo: "Matemática",
      icono: Matematica,
      ruta: "/Matematica",
      Clase:"matematica-card"
    },
    {
      Metodo: "Entrenar",
      icono: Entrenar,
      ruta: "/Entrenar",
      Clase:"entrenar-card"
    },
  ];

  return (
    <div className="metodos-container">
      {metodos.map((m, index) => (
        <MetodosCard
          key={index}
          icono={m.icono}
          Metodo={m.Metodo}
          onClick={() => navigate(m.ruta)}
          Clase={m.Clase}
        />
      ))}
    </div>
  );
};

export default Metodos;
