import React, { useState } from "react";
import "./Chat.css";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newUserMessage = { from: "user", text: inputText };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_DEEPSEEK_AI}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "React DeepSeek Chat",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            { role: "user", content: inputText }
          ]
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sin respuesta.";
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);

    } catch (error) {
      console.error("Error con la IA:", error);
      setMessages((prev) => [...prev, { from: "bot", text: "Hubo un error al conectar con la IA." }]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <h3>Asistente Virtual</h3>
        <button className="chatbot-close" onClick={onClose}>✕</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.from}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <div className="chat-message bot"><p>Escribiendo...</p></div>}
      </div>

      <div className="chatbot-footer">
        <input
          type="text"
          className="chat-input"
          placeholder="Escribe tu mensaje..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
