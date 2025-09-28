import React, { useEffect, useRef, useState } from "react";
import { Hands, Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import "../style/Abecedario.css";

interface LandmarkPoint {
  x: number;
  y: number;
  z: number;
}

interface HandPrediction {
  letter?: string;
  confidence?: number;
  error?: string;
}

interface Letra {
  letra: string;
  desbloqueada: boolean;
}

const Abecedario: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  const [predictions, setPredictions] = useState<HandPrediction[]>([]);
  const [camaraActiva, setCamaraActiva] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [letras, setLetras] = useState<Letra[]>([]);
  const [precision, setPrecision] = useState<number>(0);
  const [letraDetectada, setLetraDetectada] = useState<string | null>(null);

  const backendUrl = "http://127.0.0.1:8000";
  const sendInterval = 100; // ms
  let lastSent = 0;


  const cargarProgreso = async () => {
    try {
      const res = await fetch(`${backendUrl}/letra`);
      const data = await res.json();
      setLetras(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    cargarProgreso();
  }, []);

  // 📤 Desbloquear letra en backend
  const desbloquearLetra = async (letra: string) => {
    try {
      await fetch(`${backendUrl}/desbloquear/${letra}`, { method: "POST" });
      await cargarProgreso();
      console.log(`Letra ${letra} desbloqueada`);
    } catch (err) {
      console.error(" Error al desbloquear:", err);
    }
  };


  const activarCamara = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setCamaraActiva(true);


    if (!handsRef.current) {
      handsRef.current = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });
      handsRef.current.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.8,
        minTrackingConfidence: 0.8,
      });
    }

    handsRef.current.onResults(async (results: Results) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks) {
        for (const hand of results.multiHandLandmarks) {
          for (const point of hand) {
            ctx.beginPath();
            ctx.arc(point.x * canvas.width, point.y * canvas.height, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
          }
        }
      }
      ctx.restore();

      const now = Date.now();
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0 && now - lastSent > sendInterval) {
        lastSent = now;

        const handsData: LandmarkPoint[][] = results.multiHandLandmarks.map((hand) =>
          hand.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
        );

        try {
          const res = await fetch(`${backendUrl}/Abecedario`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ landmarks: handsData }),
          });
          const data = await res.json();

          if (data.hands) {
            setPredictions(data.hands);
            const detected = data.hands[0]?.letter;
            const conf = data.hands[0]?.confidence || 0;
            setLetraDetectada(detected);
            setPrecision(conf * 100);

            if (detected && conf >= 0.9) {
              desbloquearLetra(detected);
            }
          }
        } catch (err) {
          console.error("Error", err);
        }
      }
    });


    if (!cameraRef.current) {
      cameraRef.current = new Camera(videoRef.current, {
        onFrame: async () => {
          await handsRef.current!.send({ image: videoRef.current! });
        },
        width: 640,
        height: 420,
      });
    }

    cameraRef.current.start();
  };

  const detenerCamara = () => {
    setCamaraActiva(false);
    cameraRef.current?.stop();
  };

  

  return (
    <div className="abecedario-container">
      

      <div className="panel">
        
        <div className="panel-content">
          <div className="video-container">
            <canvas ref={canvasRef} width={640}
  height={420}  className="hand-canvas" />
        <video ref={videoRef} />
        </div>
        <div className="botones">
          <button onClick={activarCamara} className="btn activar" disabled={camaraActiva}>
            ACTIVAR
          </button>
          <button onClick={detenerCamara} className="btn detener" disabled={!camaraActiva}>
            DETENER
          </button>
          <button onClick={() => setModalAbierto(true)} className="btn progreso">
            PROGRESO
          </button>
          
        </div>
        </div>
        <div className="instrucciones-container">
         <h2>Indicaciones de uso: </h2>
         <div className="indicaciones">
            <li>El usuario a de activar la cámara para que empiece el reconocimiento de las letras
</li>
         <li>Presionar el botón de GUÍA para observar las señas exactas
</li>
         <li>Sí el porcentaje de precisión supera el 90% habrá logrado desbloquear una nueva seña :D</li>
         </div>

        </div>
      </div>
      <div className="result-hand-container">

        
          <div className="resultado">
            <h2>Letra detectada:</h2>
            <p className="p-ld"> {letraDetectada}</p>
            <p className="p-precision">Precisión: {precision.toFixed(1)}%</p>
          </div>
        

        <div className="div-historial">
          {/* {predictions.map((p, i) => (
            <div key={i} className="hand-prediction">
                Mano {i + 1}: {p.letter ? `${p.letter} (${(p.confidence! * 100).toFixed(1)}%)` : p.error}
            </div>
          ))} */}
        </div>
        </div>  

      
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Progreso del Abecedario</h2>
            <div className="div-progreso-modal">
              {Array.isArray(letras) &&
                letras.map((l) => (
                  <div key={l.letra} className={`letra ${l.desbloqueada ? "dorada" : "gris"}`}>
                    {l.letra}
                  </div>
                ))}
            </div>
            <button className="btn cerrar" onClick={() => setModalAbierto(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Abecedario;
