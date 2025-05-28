import React, { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = ({ fontSize, isHighContrast }) => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            id: 1,
            title: "Chat 1",
            status: "Completo",
            time: "",
            messages: [{ from: "bot", text: "Hola 👋 ¿En qué puedo ayudarte hoy?" }],
          },
          {
            id: 2,
            title: "Chat 2",
            status: "Ejecutando",
            time: "00:31:00",
            messages: [],
          },
        ];
  });
  const [currentChatId, setCurrentChatId] = useState(chats[0]?.id || 1);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputEnable, setInputEnabled] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const handleSend = async () => {
    if (!inputText.trim() || !inputEnable) return;

    const newUserMessage = { from: "user", text: inputText };
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, newUserMessage] }
          : chat
      )
    );
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_DEEPSEEK_AI}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "React DeepSeek Chat",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: inputText }],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sin respuesta.";
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, { from: "bot", text: reply }] }
            : chat
        )
      );
    } catch (error) {
      console.error("Error con la IA:", error);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, { from: "bot", text: "Hubo un error al conectar con la IA." }],
              }
            : chat
        )
      );
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const toggleInput = () => {
    setInputEnabled((prev) => !prev);
  };

  

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
    setIsMaximized(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const addNewChat = () => {
    const newChatId = chats.length ? Math.max(...chats.map((chat) => chat.id)) + 1 : 1;
    const newChat = {
      id: newChatId,
      title: `Chat ${newChatId}`,
      status: "Nuevo",
      time: "",
      messages: [{ from: "bot", text: "Hola 👋 ¿En qué puedo ayudarte hoy?" }],
    };
    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChatId);
  };

  const selectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId) || chats[0];

  return (
    <div
      className={`chatbot-container ${isHighContrast ? "high-contrast" : ""} ${isMaximized ? "maximized" : ""} ${
        isMinimized ? "minimized" : ""
      }`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="chatbot-header">
        <span>Chatbot</span>
        <div className="header-buttons">
          <button onClick={toggleSidebar} className="sidebar-toggle-btn">
            {isSidebarVisible ? "◄" : "►"}
          </button>
          <button onClick={toggleMinimize} className="minimize-btn">
            {isMinimized ? "🡙" : "🡛"}
          </button>
          
          <button onClick={() => window.close()} className="close-btn">✖</button>
        </div>
      </div>

      {!isMinimized && (
        <div className="chatbot-content">
          {isSidebarVisible && (
            <div className="item-list">
              <div className="chat-controls">
                <button className="chat-button" onClick={addNewChat}>
                  Añadir Chat
                </button>
              </div>
              {chats.map((chat) => (
                <div
                  className={`item ${chat.id === currentChatId ? "selected" : ""}`}
                  key={chat.id}
                  onClick={() => selectChat(chat.id)}
                >
                  <div className="item-title">
                    {chat.title}
                    <span className="status">{chat.status}</span>
                  </div>
                  {chat.time && <div className="time">{chat.time}</div>}
                  <button className="play-button">▶</button>
                </div>
              ))}
            </div>
          )}

          <div className="chatbot-window">
            <div className="chatbot-messages">
              {currentChat?.messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.from}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
              {loading && (
                <div className="chat-message bot">
                  <p>Escribiendo...</p>
                </div>
              )}
            </div>
            <div className="chatbot-footer">
              <button className="toggle-input-btn" onClick={toggleInput}>
                {inputEnable ? "🔒" : "🔓"}
              </button>
              <input
                type="text"
                className="chat-input"
                placeholder="Escribe tu mensaje..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading || !inputEnable}
              />
              <button onClick={handleSend} disabled={loading || !inputEnable}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;