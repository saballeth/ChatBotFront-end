import React, { useState, useEffect } from "react";
import "./Principal.css";
import Procesamiento_de_voz from "./Procesamiento_de_voz";
import { fetchPlantUMLCode } from "./deepseek_service";

function ComponentePrincipal() {
  const [voiceMessage, setVoiceMessage] = useState(""); 
  const [plantUMLCode, setPlantUMLCode] = useState(""); 

  useEffect(() => {
    if (!voiceMessage) return; 

    console.log("🎙️ Mensaje de voz recibido:", voiceMessage);

    fetchPlantUMLCode(voiceMessage).then((umlCode) => {
      console.log("📄 Código PlantUML generado:", umlCode);
      setPlantUMLCode(umlCode);
    });

  }, [voiceMessage]); 

  return (
    <div className="container">
      <div className="sidebar">
        <Procesamiento_de_voz setVoiceMessage={setVoiceMessage} />
      </div>

      <div className="right-panel">
        <div className="plantuml">
          <h2>Código Plant UML</h2>
          <textarea value={plantUMLCode} readOnly />
        </div>
      </div>
    </div>
  );
}

export default ComponentePrincipal;
