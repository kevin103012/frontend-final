
import manoIcon from '../assets/mano_icon_white.png';
import '../style/Principal.css';
import Progreso from '../components/Principal/Progreso';
import Metricas from '../components/Principal/Metricas';
import Metodos from '../components/Principal/Metodos';
import Logros from '../components/Principal/Logros';



function Principal() {
  return (

     <div className="App">
     
          <div>
            <header className='header'>
              <div className='nav-container'>
                <img className='app-logo img-logo' src={manoIcon} alt="logo" />
                <div className='texto-header'>
                  <h1 className='SI-frase'>SIGN IA</h1>
                  <p>Reconocimiento de señas con IA</p>
                </div>
              </div>
            </header>

            <div className='presentacion-container'>
              <h2>APRENDE LENGUAJE DE SEÑAS CON IA</h2>
              <p>
                "Impulsa tu aprendizaje con una herramienta innovadora basada en Inteligencia Artificial,
                diseñada para facilitar la comunicación, promover la accesibilidad y transformar la manera
                de aprender lenguaje de señas."
              </p>
            </div>

            <div className='m-progreso-container'>
              <h2>TU PROGRESO</h2>
              <Progreso />
              <Metricas />
            </div>
            
            <div className='m-metodos-container'>
              <h2>MÉTODOS DE APRENDIZAJE</h2>
              <Metodos />
            </div>

            <div className='m-logros-container'>
              <h2>TUS LOGROS</h2>
              <Logros />
            </div>

            <div>
               
            </div>
          </div>
        

        {/* Página de la ruta /xd */}
     
        
    </div>

  )
}

export default Principal;