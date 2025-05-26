import ChatBot from '../Componentes/ChatBot/Chat';
import Navegador_Chatbot from '../Componentes/navegador_chatBot/navegador_Chatbot';

function Chat() {
  return (
    <div className="contenedor-horizontal">
      <Navegador_Chatbot />
      <ChatBot />
    </div>
  );
}

export default Chat;