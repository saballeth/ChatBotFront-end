import "./navegador_Chat.css"
const Navegador_Chatbot = () => {
  const items = [
    { title: 'Diagrams de clase', status: 'Completo', time: '' },
    { title: 'Diagrama de objetos', status: 'Ejecutando', time: '00:31:00' }
  ];

  return (
    <div className="app">
      <div className="item-list">
      <div className="search-bar">
        <input type="text" placeholder="Buscar chat" />
        <button className="chat-button">CHAT +</button>
      </div>
        {items.map((item, index) => (
          <div className="item" key={index}>
            <div className="item-title">
              {item.title}
              <span className="status">{item.status}</span>
            </div>
            {item.time && <div className="time">{item.time}</div>}
            <button className="play-button">▶</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navegador_Chatbot;
