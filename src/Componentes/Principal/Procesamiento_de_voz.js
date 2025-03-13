import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function ProcesamientoDeVoz({ setVoiceMessage }) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      console.log(" Mensaje de voz detectado:", transcript);
      setVoiceMessage(transcript);
      resetTranscript();
    }
  }, [listening, transcript, setVoiceMessage]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>⚠️ Tu navegador no soporta reconocimiento de voz.</p>;
  }

  return (
    <div>
      <button 
        onClick={() => SpeechRecognition.startListening({ continuous: false, language: "es-ES" })} 
        disabled={listening}
      >
        🎤 {listening ? "Escuchando..." : "Iniciar Voz"}
      </button>
      <button onClick={SpeechRecognition.stopListening}>🛑 Detener</button>
      <p>{transcript && `📝 Mensaje: ${transcript}`}</p>
    </div>
  );
}

export default ProcesamientoDeVoz;
