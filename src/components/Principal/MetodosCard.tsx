import React from "react";

interface MetodosCardProps {
    icono: string;
    Metodo: string;
    onClick?: () => void; 
    Clase: string;
}

const MetodosCard : React.FC<MetodosCardProps> = ({
    icono,
    Metodo,
    onClick: ruta,
    Clase
}) => {
    return (
        <div className={`metodo-card ${Clase}`}>
            <img src={icono} alt="" />
            <p className="p-metodo">{Metodo}</p>
            <button className="btn-metodo" onClick={ruta}>INICIAR</button>
        </div>
    )

}

export default MetodosCard;