import React, { useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react';
import MermaidChart from './components/MermaidChart';

const diagramContent = `
graph TD
    classDef default fill:#0f172a,stroke:#334155,stroke-width:1px,color:#f8fafc;
    classDef highlight fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef data fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff;

    subgraph Docente ["🎓 Rol: Docente (Usuario)"]
        A[Define Requerimientos] -- "Prompt / Instrucciones" --> B
    end

    B{"<img src='./images/antigravity-small.png' width='45' /><br/>Orquestador IA"}
    B -- "1. Crea Estructura" --> C
    B -- "2. Genera código<br/>para construir" --> D

    subgraph Backend ["📊 Capa de Datos (Google)"]
        C["<img src='./images/google-spreadsheet.gif' width='45' /><br/>Google Sheets"]
        C <--> F["<img src='./images/google-apps-script-small.png' width='45' /><br/>Google Apps Script"]
        F -- "Alimenta /<br/>Recoje información" --> D
    end

    D["<img src='./images/interface-small.png' width='45' /><br/>Interface Backend"]

    I["<img src='./images/interface-small.png' width='45' /><br/>Interface Frontend"]
    I -- "Consulta contenido" --> C

    %% Estilos
    class B highlight;
    class C data;
`;

function App() {
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Error intentando habilitar pantalla completa:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Monitorear cambios de estado de pantalla completa (por si el usuario pulsa Esc)
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#0f172a' }} ref={containerRef}>
      <div className="title-bar">
        <h1>Arquitectura No-Code/Low-Code</h1>
        <p>Pipeline interactivo impulsado por Antigravity</p>
      </div>

      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false}
        wheel={{ disabled: true }}
        panning={{ velocityDisabled: false }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div style={{ width: '100%', height: '100%' }}>
            <TransformComponent wrapperStyle={{ width: '100vw', height: '100vh' }} contentStyle={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MermaidChart chart={diagramContent} />
            </TransformComponent>

            <div className="controls-panel">
              <button 
                className="control-btn" 
                onClick={() => zoomIn(0.4)} 
                title="Acercar"
              >
                <ZoomIn size={20} />
              </button>
              <button 
                className="control-btn" 
                onClick={() => zoomOut(0.4)} 
                title="Alejar"
              >
                <ZoomOut size={20} />
              </button>
              <button 
                className="control-btn" 
                onClick={() => resetTransform()} 
                title="Centrar"
              >
                <RotateCcw size={20} />
              </button>
              <button 
                className="control-btn" 
                onClick={toggleFullScreen} 
                title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}

export default App;
