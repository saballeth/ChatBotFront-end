import Principal from '../Componentes/principal/Principal';
import Chatbot from '../Vistas/ChatBot';
import "../../index.css";


function principal() {
    return (
        <div className="main-layout-vertical">
        <Principal />
        <Chatbot />
        </div>
    );
};
export default principal;