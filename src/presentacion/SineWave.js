import { useEffect, useRef } from "react";

const SineWave = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas(); 
    window.addEventListener("resize", resizeCanvas); 

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const amplitude = 20;
      const frequency = 0.05;
      const speed = 0.02;

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x < width; x++) {
        const y =
          height / 2 + amplitude * Math.sin(frequency * x + timeRef.current);
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#4f46e5"; // Color morado
      ctx.lineWidth = 2;
      ctx.stroke();

      timeRef.current += speed;
      requestRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100px" }} 
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default SineWave;
