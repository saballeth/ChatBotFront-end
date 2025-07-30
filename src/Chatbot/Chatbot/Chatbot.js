import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import "./Chatbot.css";

const Chatbot = ({ fontSize, isHighContrast }) => {
  // --- Estados principales ---
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋 ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);



  // --- Estados para fases de navegación y voz ---
  const [navigationPhase, setNavigationPhase] = useState('introduction');
  const [voiceActivationCount, setVoiceActivationCount] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const phaseTimeoutRef = useRef(null);
  const audioRef = useRef(new Audio());
  const silenceTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const sendBtnRef = useRef(null);
  const [conversationMode, setConversationMode] = useState(true); // o false si quieres iniciar desactivado


  // --- Speech Recognition ---
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
  if (!browserSupportsSpeechRecognition) return;

  // Si el bot está hablando, no escuchar
  if (isSpeaking) {
    if (listening) SpeechRecognition.stopListening();
    return;
  }

  // Solo escuchar si está en fase correcta y no hablando
  if ((navigationPhase === 'voiceActivation' || navigationPhase === 'voiceActive') && !listening) {
    SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
  }

  return () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };
}, [navigationPhase, isSpeaking]);


  useEffect(() => {
    // Limpiar timeouts al desmontar
    return () => {
      clearTimeout(phaseTimeoutRef.current);
      stopAudio();
      clearTimeout(silenceTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    switch (navigationPhase) {
      case 'introduction':
        setShowWelcome(true);
        phaseTimeoutRef.current = setTimeout(() => {
          setNavigationPhase('keyboardNavigation');
          setShowWelcome(false);
        }, 8000);
        break;
      case 'keyboardNavigation':
        setShowWelcome(false);
        break;
      case 'optionSelected':
        phaseTimeoutRef.current = setTimeout(() => {
          setNavigationPhase('voiceInstructions');
        }, 3000);
        break;
      case 'voiceInstructions':
        phaseTimeoutRef.current = setTimeout(() => {
          setNavigationPhase('voiceActivation');
        }, 5000);
        break;
      default:
        break;
    }
    return () => clearTimeout(phaseTimeoutRef.current);
  }, [navigationPhase]);

  // --- Funciones de audio ---
  const playAudio = (src, onEnded = () => {}) => {
    stopAudio();
    audioRef.current.src = src;
    audioRef.current.onended = onEnded;
    audioRef.current.play().catch(e => console.error("Error al reproducir audio:", e));
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // --- Temporizador de silencio ---
  const resetSilenceTimer = () => {
    clearTimeout(silenceTimeoutRef.current);
    silenceTimeoutRef.current = setTimeout(() => {
      setNavigationPhase('keyboardNavigation');
      SpeechRecognition.stopListening();
    }, 5000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // --- Síntesis de voz ---
  const speak = (text, cb) => {
  if ('speechSynthesis' in window && text) {
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "es-ES";
    utter.rate = 1;

    setIsSpeaking(true);
    utter.onend = () => {
      setIsSpeaking(false);
      if (typeof cb === "function") cb();

      // 👉 Reanudar escucha si estamos en modo conversación
      if (conversationMode) {
        SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
      }
    };
    window.speechSynthesis.speak(utter);
  } else {
    if (typeof cb === "function") cb();
  }
};


  // --- Feedback auditivo por fase ---
  useEffect(() => {
    let feedback = "";
    switch (navigationPhase) {
      case 'introduction':
        feedback = "Bienvenido al Chatbot Accesible. Usa tu voz para interactuar.";
        break;
      case 'keyboardNavigation':
        feedback = "Navegación por voz activada. Usa tu voz para conversar con el asistente.";
        break;
      case 'optionSelected':
        feedback = "Opción seleccionada. Ahora recibirás instrucciones para el modo de voz.";
        break;
      case 'voiceInstructions':
        feedback = "Modo de voz activado, di la palabra chatbot tres veces para activar el reconocimiento de voz.";
        break;
      case 'voiceActive':
        feedback = "Modo de voz activado, puedes hablar con el asistente.";
        break;
      default:
        break;
    }
    if (feedback) {
      setCurrentFeedback(feedback);
      speak(feedback);
    }
    // eslint-disable-next-line
  }, [navigationPhase]);


  const toggleListening = () => {
    if (!browserSupportsSpeechRecognition) {
      setMessages(prev => [...prev, { 
        from: "bot", 
        text: "Lo siento, tu navegador no soporta reconocimiento de voz." 
      }]);
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ language: 'es-ES' });
      setIsListening(true);
    }
  };

  // Función para enviar mensaje
  const handleSend = async (messageText = inputText) => {
  if (!messageText.trim()) return;
  
  const newUserMessage = { from: "user", text: messageText };
  setMessages(prev => [...prev, newUserMessage]);
  setInputText(""); // Limpiar campo de texto
  setLoading(true);

  setTimeout(() => {
    const botResponse = "He recibido tu mensaje de voz. Estoy procesando tu solicitud.";
    setMessages(prev => [...prev, { from: "bot", text: botResponse }]);
    setLoading(false);
    speak(botResponse);
  }, 1500);
};


  useEffect(() => {
    if (currentFeedback) {
      speak(currentFeedback);
      setCurrentFeedback('');
    }
  }, [currentFeedback]);

  // --- Transcripción en tiempo real y envío automático al detectar pausa ---
useEffect(() => {
  if (listening) {
    setInputText(transcript);

    clearTimeout(silenceTimeoutRef.current);
    silenceTimeoutRef.current = setTimeout(() => {
      if (transcript.trim() !== "") {
        SpeechRecognition.stopListening(); // ⛔ detener escucha para esperar respuesta del bot
        handleSend(transcript.trim());
        resetTranscript();
        setInputText("");
      }
    }, 2000);
  }
}, [transcript]);

useEffect(() => {
  if (conversationMode && !listening) {
    SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
  }
}, [conversationMode]);


  // --- Renderizado ---
  return (
    <div className="chatbot-wrapper">
    <div
      aria-label="Área de chat con el asistente accesible"
      role="region"
      aria-live="polite"
      className={`chatbot-container ${isHighContrast ? "high-contrast" : ""} ${showWelcome ? "maximized" : ""}`}
      style={{ fontSize: `${fontSize}px` }}
      tabIndex={-1}
    >
      {navigationPhase === 'introduction' && (
        <div className="phase-message">
          <h2>Bienvenido al Chatbot Accesible</h2>
          <p>Para navegar utiliza tu voz</p>
          <p>El sistema te guiará paso a paso en la interacción</p>
        </div>
      )}
      {navigationPhase === 'voiceInstructions' && (
        <div className="phase-message">
          <h2>Modo de Voz Activado</h2>
          <p>Ahora puedes interactuar por voz</p>
          <p>Di "chatbot" tres veces para comenzar</p>
        </div>
      )}
      {(navigationPhase === 'keyboardNavigation' ||
        navigationPhase === 'optionSelected' ||
        navigationPhase === 'voiceActivation' ||
        navigationPhase === 'voiceActive') && (
        <section className="chat-area" aria-label="Conversación actual">
          <div className="chat-header">
            <h2 className="chat-header-title" tabIndex={0}>Chat con el asistente accesible</h2>
            {!browserSupportsSpeechRecognition && (
              <p className="voice-warning">
                Tu navegador no soporta reconocimiento de voz
              </p>
            )}
          </div>
          <div className="chat-messages" aria-live="polite" aria-atomic="false">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.from}`}>
                <div className={`message-content ${msg.from}`}>
                  <span className="message-sender">
                    {msg.from === "user" ? "Tú" : "Asistente"}
                  </span>
                  <span className="message-text" style={{ fontSize: `${fontSize}px`, letterSpacing: '0.1em' }}>{msg.text}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <div className="message-content bot">
                  <span className="message-text">procesando...</span>
                </div>
              </div>
            )}
          </div>
          <form
            aria-label="Área de entrada de mensaje"
            className="chat-footer"
            onSubmit={e => { e.preventDefault(); handleSend(); }}
          >
            <label className="input-container">
              <div className="input-wrapper">
                <input
                  ref={inputRef}
                  placeholder="Retroalimentación de voz"
                  className="chat-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  style={{ fontSize: `${fontSize}px`, letterSpacing: '0.1em' }}
                  aria-label="Escribe tu mensaje"
                  autoComplete="off"
                  required
                />
                <div className="voice-controls">
            <button
              onClick={toggleListening}
              className={`voice-btn ${listening ? 'listening' : ''}`}
              aria-label={listening ? "Detener escucha" : "Iniciar escucha"}
            >
              {listening ? (
                <>
                  <div className="pulse-animation"></div>
                  <span>Escuchando...</span>
                </>
              ) : (
                <span>🎤 Hablar</span>
              )}
            </button>
          </div>
              </div>
            </label>
          </form>
        </section>
      )}
    </div>
    </div>
  );
};

export default Chatbot;