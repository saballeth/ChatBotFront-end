import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <h2>Bienvenido</h2>
      <p>
        Para acceder al sistema por favor elija entre las dos opciones
      </p>
      <div className="buttons">
        <button
          className="button button-primary"
          aria-label="0% vision"
          onClick={() => navigate("/0visual")}
        >
          <img
            src="https://storage.googleapis.com/a1aa/image/466b29ed-776e-40cd-bae0-5f9b3dbef0ee.jpg"
            alt="Icono de doctor con estetoscopio, vista frontal, estilo dibujo animado"
            width={64}
            height={64}
          />
          <span>0% vision</span>
        </button>

        <button
          className="button button-secondary"
          aria-label="100% y baja vision"
          onClick={() => navigate("/visual")}
        >
          <img
            src="https://storage.googleapis.com/a1aa/image/0b67db7c-b719-4879-d9d4-212c32a64fa3.jpg"
            alt="Icono de hombre con corbata, vista frontal, estilo dibujo animado"
            width={64}
            height={64}
          />
          <span>100% y baja vision</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
