import React, { useState } from "react";
import Chat from "./chat";
import ProcesamientoDeVoz from "./Procesamiento_de_voz";

const App = () => {
  const [voiceMessage, setVoiceMessage] = useState("");

  return (
    <div>
      <ProcesamientoDeVoz setVoiceMessage={setVoiceMessage} />
      <Chat voiceMessage={voiceMessage} />
    </div>
  );
};

export default App;
