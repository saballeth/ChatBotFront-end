import React, { useState, useEffect } from "react";
import "./Principal.css";
import Logo from "../../../assets/imagenes/Logo.png";
import Chatbot from "../Chatbot/Chatbot";



const Principal = () => {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("highContrast") === "true";
  });

  const [fontScale, setFontScale] = useState(() => {
    const savedScale = parseFloat(localStorage.getItem("fontScale"));
    return !isNaN(savedScale) ? savedScale : 1;
  });

  // Convertir fontScale a fontSize en píxeles (base: 16px)
  const fontSize = 16 * fontScale;

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("highContrast", highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", fontScale);
    localStorage.setItem("fontScale", fontScale.toString());
  }, [fontScale]);

  const handleContrastToggle = () => {
    setHighContrast((prev) => !prev);
  };

  const handleFontIncrease = () => {
    setFontScale((prev) => (prev < 1.5 ? prev + 0.1 : prev));
  };

  const handleFontDecrease = () => {
    setFontScale((prev) => (prev > 0.8 ? prev - 0.1 : prev));
  };

  return (
    <div className={`principal ${highContrast ? "high-contrast" : ""}`}>
      <header className="custom-header">
        <div className="left-section"></div>
        <div className="center-section">
          <img src={Logo} alt="Logo central" className="center-logo" />
          <div className="logo-text">Modelo UML basado en voz</div>
        </div>
        <div className="right-section">
          <button className="text-resize-button decrease" onClick={handleFontDecrease}>
            A-
          </button>
          <button className="text-resize-button increase" onClick={handleFontIncrease}>
            A+
          </button>
          <label className="switch">
            <input
              type="checkbox"
              id="contrast-toggle"
              checked={highContrast}
              onChange={handleContrastToggle}
            />
            <span className="slider"></span>
          </label>
        </div>
      </header>
      <main>
        <Chatbot fontSize={fontSize} isHighContrast={highContrast} />       </main>
    </div>
  );
};

export default Principal;