import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  htmlLabels: true,
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
});

const MermaidChart = ({ chart }) => {
  const [svgStr, setSvgStr] = useState('');
  const chartId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderChart = async () => {
      if (!chart) return;
      
      try {
        // Limpiar el contenido previo para evitar IDs duplicados en el DOM
        setSvgStr('');
        
        // Renderizar usando un ID único
        const { svg } = await mermaid.render(chartId.current, chart);
        setSvgStr(svg);
      } catch (error) {
        console.error('Error al renderizar Mermaid:', error);
      }
    };
    
    renderChart();
  }, [chart]);

  return (
    <div 
      className="mermaid-container"
      dangerouslySetInnerHTML={{ __html: svgStr }} 
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
};

export default MermaidChart;
