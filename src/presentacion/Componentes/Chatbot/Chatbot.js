import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import Sinewave from "../../SineWave";

const Chatbot = ({ fontSize, isHighContrast, inputEnabled, input }) => {
  
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
      
      speak(reply);
      
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

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
    setIsMaximized(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const speak = (text) => {
    // Detener cualquier lectura previa
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES"; // Cambia el idioma si quieres
    window.speechSynthesis.speak(utterance);
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
  const selected = chats.find((chat) => chat.id === chatId);
  setCurrentChatId(chatId);

  // Hablar primero el título, luego el último mensaje del bot si existe
  speak(`Abriendo ${selected?.title}`, () => {
    const lastBotMsg = selected?.messages?.slice().reverse().find(m => m.from === 'bot');
    if (lastBotMsg) {
      speak(lastBotMsg.text);
    }
  });
};

  const currentChat = chats.find((chat) => chat.id === currentChatId) || chats[0];

  const lastSpokenIndex = useRef(-1);

  return (
    <div
      aria-label="Area de chat con Alex"
      className={`chatbot-container ${isHighContrast ? "high-contrast" : ""} ${isMaximized ? "maximized" : ""} ${isMinimized ? "minimized" : ""}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="layout-container">
        <div className="layout-content">
          {isSidebarVisible && !isMinimized && (
            <div className={`sidebar ${isHighContrast ? "high-contrast" : ""}`}>
              <div className="sidebar-content">
                <h1 className="sidebar-title">Chats</h1>
                <div className="chat-list">
                  <div className="new-chat-item" onClick={addNewChat}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      className="new-chat-icon"
                    >
                      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                    </svg>
                    <p className="new-chat-text">Nuevo Chat</p>
                  </div>
    {chats.map((chat) => (
      <div
        key={chat.id}
        className={`chat-item ${chat.id === currentChatId ? "selected" : ""}`}
        onClick={() => selectChat(chat.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
          className="chat-icon"
        >
          <path
            d={
              chat.id === currentChatId
                ? "M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z"
                : "M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"
            }
          ></path>
        </svg>

        <div style={{ fontSize: `${fontSize}px`, letterSpacing: '0.2em' }}>
          <p className="chat-title">{chat.title}</p>
          <span className="chat-status">{chat.status}</span>
          {chat.time && <span className="chat-time">{chat.time}</span>}
        </div>
      </div>
    ))}

                </div>
              </div>
            </div>
          )}
          <div className="chat-area">
            <div className="chat-header">
              <button
              onClick={(e) => {
                toggleSidebar(); // <-- tu función real
                speak("Botón para crear una nueva conversación");
              }}
                className="sidebar-toggle-btn">
                {isSidebarVisible ? "◄" : "►"}
              </button>
              <p className="chat-header-title">Chat con Alex</p>
              <div className="header-buttons">
                <button onClick={toggleMinimize} className="minimize-btn">
                  {isMinimized ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M208,136H48a8,8,0,0,1,0-16H208a8,8,0,0,1,0,16Z"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M208,136H136v72a8,8,0,0,1-16,0V136H48a8,8,0,0,1,0-16h72V48a8,8,0,0,1,16,0v72h72a8,8,0,0,1,0,16Z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {!isMinimized && (
              <>
                <div className="chat-messages">
                  {currentChat?.messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.from}`}>
                      {msg.from === "bot" && (
                        <div
                          className="avatar"
                          style={{
                            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtLeaWcm3Gq5WXfCug9GLCB3ChksC5wskGbfqeQ36EuED-IuQuTAzOmDWZjp4cKlIqBWNPGXPV8W9daFTgx0gK2FmDOxY0gQZ-K5ZK08X0dmN7zLwVMfnnPyMENPt4A5jDqu1WtYTcnxyqnD0UtZd5rJ4nhml39_3cxeBgAyI43gIBQmWJkk0feSJinNLWH5lpp2Z1BVRGH7Zsj_VCtmZNLTfp-j5WQnZlk72VqD4EHTLkRFaQr5QLGL9QpR-h9TbQalZGfDhAY6yl")`,
                          }}
                        ></div>
                      )}
                      
                      <div className={`message-content ${msg.from}`}>
                        <p className="message-sender">{msg.from === "user" ? "Tú" : "Alex"}</p>
                        <p className="message-text" style={{ fontSize: `${fontSize}px`, letterSpacing: '0.1em' }}>{msg.text}</p>
                      </div>
                      {msg.from === "user" && (
                        <div
                          className="avatar"
                          style={{
                            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSe2vZbyRe20H6pY4fuXIOMMt9LV5llzfn6sKzf5DL3g9YNjfL9lWbkvn6r89BlMhSBzvRZFBoc-jDBCj39wh3m7y3lQUNsAaKqgrX_rmrmjDr2ps__cyUVcY7U2rHY_HPVqLXNpFFhTf1YRXJ60b-z7UoKQjxZe9s8WChzlAqz4EXeQ5xFnODwO5xgGPoSGHm6EUvTPKZGsCjZPoafZ3uc-fV8Vka6rGzVsGaLaRBOYl2RxEKxfN6fNLIKsmj0aAF-ejkuB-HzIVj")`,
                          }}
                        ></div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="message bot">
                      <div
                        className="avatar"
                        style={{
                          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtLeaWcm3Gq5WXfCug9GLCB3ChksC5wskGbfqeQ36EuED-IuQuTAzOmDWZjp4cKlIqBWNPGXPV8W9daFTgx0gK2FmDOxY0gQZ-K5ZK08X0dmN7zLwVMfnnPyMENPt4A5jDqu1WtYTcnxyqnD0UtZd5rJ4nhml39_3cxeBgAyI43gIBQmWJkk0feSJinNLWH5lpp2Z1BVRGH7Zsj_VCtmZNLTfp-j5WQnZlk72VqD4EHTLkRFaQr5QLGL9QpR-h9TbQalZGfDhAY6yl")`,
                        }}
                      ></div>
                      <div className="message-content bot">
                        <p className="message-sender">Alex</p>
                        <p className="message-text">Escribiendo...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div aria-label="Area de identificacion de voz" className="chat-footer">
  {input ? (
    <label className="input-container">
      <div className="input-wrapper">
        <input
          placeholder="Escribe un mensaje"
          className="chat-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ fontSize: `${fontSize}px`, letterSpacing: '0.1em' }}
        />
        <div className="input-buttons">
          <button
            className="send-btn"
            onClick={handleSend}
            style={{ fontSize: `${fontSize}px`, letterSpacing: '0.1em' }}
          >
            <span className="truncate">Enviar</span>
          </button>
        </div>
      </div>
    </label>
  ) : (
    <Sinewave />
  )}
</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;