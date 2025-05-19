import React, { useState } from "react";
import "./Chat.css";

const Chatbot = ({ onClose }) => {
  const [showInput, setShowInput] = useState(false);
  const fakeMessages = [
    { from: "bot", text: "Hola 👋 ¿En qué puedo ayudarte hoy?" },
    { from: "user", text: "Quiero saber más sobre los servicios." },
    { from: "bot", text: "Claro, ofrecemos soluciones en tecnología, asesoría y más." },
    { from: "bot", text: "¿Deseas agendar una reunión con nuestro equipo?" },
  ];

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <h3>Asistente Virtual</h3>
        <button className="chatbot-close" onClick={onClose}>✕</button>
      </div>

      <div className="chatbot-messages">
        {fakeMessages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.from}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="chatbot-footer">
        <button
          className="toggle-input-btn"
          onClick={() => setShowInput((prev) => !prev)}
          title={showInput ? "Ocultar input" : "Mostrar input"}
        >
          🖊️
        </button>
        {showInput && (
          <input
            type="text"
            className="chat-input"
            placeholder="Escribe tu mensaje..."
          />
        )}
      </div>
    </div>
  );
};

export default Chatbot;
