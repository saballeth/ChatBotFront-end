import React, { useState } from "react";
import "./PrincipalNormalVision.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function PrincpipalNormalVisual() {
  const [contrast, setContrast] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className={contrast ? "bg-white text-black" : "bg-white text-black"}>
      {/* Top bar */}
      <header className="bg-indigo-600 h-14 flex items-center justify-end px-6 space-x-6">
        <button aria-label="Notifications" className="text-white text-lg">
          <i className="fas fa-bell"></i>
        </button>
        <button aria-label="User profile" className="text-white text-lg">
          <i className="fas fa-user"></i>
        </button>
      </header>

      <main className="flex flex-col md:flex-row max-w-[1200px] mx-auto mt-6 px-4 md:px-6 gap-6">
        {/* Left panel */}
        <section className="flex flex-col w-full max-w-[320px] border border-indigo-100 rounded-xl p-4">
          <h2 className="text-sm mb-3">Sistema UML</h2>
          <form className="flex items-center mb-4 space-x-2" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="search-chat">Pesquisar chat</label>
            <div className="relative flex-grow">
              <input
                id="search-chat"
                type="search"
                placeholder="Pesquisar chat"
                className="w-full text-xs text-indigo-300 placeholder-indigo-300 bg-indigo-50 border border-indigo-100 rounded-md py-2 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <i className="fas fa-search absolute left-2 top-1/2 -translate-y-1/2 text-indigo-300 text-xs pointer-events-none" />
            </div>
            <button type="button" className="text-indigo-600 text-xs font-semibold tracking-wide">
              CHAT <span className="text-indigo-600 font-bold">+</span>
            </button>
          </form>

          <nav className="flex flex-col space-y-3 overflow-y-auto scrollbar-thin" style={{ maxHeight: "300px" }}>
            <button className="bg-indigo-50 border border-indigo-200 rounded-lg py-3 px-4 text-xs font-semibold text-indigo-900 shadow-sm hover:bg-indigo-100">
              <span>Diagramas de clase</span>
              <i className="fas fa-play text-indigo-600" />
            </button>

            <button className="bg-white border border-indigo-100 rounded-lg py-3 px-4 text-xs text-indigo-900 hover:bg-indigo-50">
              <div className="flex flex-col text-left">
                <span className="font-bold">Diagrama de objetos</span>
                <div className="flex space-x-2 text-[10px] text-indigo-300">
                  <span>Completo</span>
                  <span className="font-normal text-indigo-600">Ejecutando</span>
                </div>
              </div>
              <span className="text-xs font-mono text-indigo-600">00:31:00</span>
              <i className="fas fa-play text-indigo-600" />
            </button>
          </nav>

          <div className="mt-auto flex items-center justify-between px-1 pt-6">
            <div className="flex items-center space-x-1">
              <button className="text-3xl font-light leading-none text-black">−</button>
              <button className="text-3xl font-light leading-none text-black">+</button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-normal">ZOOM</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={contrast}
                  onChange={() => setContrast(!contrast)}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-indigo-400 peer-checked:bg-indigo-600 transition-colors"></div>
                <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></span>
              </label>
              <span className="text-lg font-normal">Contraste</span>
            </div>
          </div>
        </section>

        {/* Right panel */}
        <section className="flex flex-col flex-grow border border-indigo-100 rounded-xl">
          <header className="flex items-center justify-between border-b border-indigo-100 p-4 rounded-t-xl">
            <div>
              <h3 className="text-xs font-bold text-indigo-900 leading-tight">Diagramas de clase</h3>
              <p className="text-[10px] text-indigo-400 font-semibold mt-0.5">#CU6798H</p>
            </div>
            <button className="text-indigo-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center hover:bg-indigo-100">
              <i className="fas fa-info"></i>
            </button>
          </header>

          <div className="flex flex-col p-4 space-y-6 overflow-y-auto scrollbar-thin" style={{ maxHeight: "600px" }}>
            {/* Mensaje izquierda */}
            <div className="flex items-start space-x-3 max-w-[600px]">
              <div className="w-8 h-8 rounded-full bg-indigo-300 text-indigo-600 font-semibold text-xs flex items-center justify-center">D</div>
              <div>
                <div className="text-[10px] text-indigo-500 border border-indigo-300 rounded-md px-3 py-1.5 w-[280px]">
                  Dime la distribución del diagrama de clases
                </div>
                <p className="text-[8px] text-indigo-700 mt-1 ml-1">8:00 PM</p>
              </div>
            </div>

            {/* Mensaje derecha */}
            <div className="flex items-start space-x-3 max-w-[600px] ml-auto">
              <div>
                <div className="text-[10px] text-white bg-indigo-600 rounded-lg px-3 py-2 max-w-[400px] leading-tight">
                  Una clase Libro con atributos como el título, autor, precio y métodos como prestar. [...]
                </div>
              </div>
              <img
                alt="Perfil"
                className="w-8 h-8 rounded-full object-cover"
                src="https://storage.googleapis.com/a1aa/image/4425b688-ddfc-4405-8b74-76e0ce42c6e9.jpg"
              />
            </div>

            {/* Diagrama ASCII */}
            <div className="flex items-start space-x-3 max-w-[600px]">
              <div className="w-8 h-8 rounded-full bg-indigo-300 text-indigo-600 font-semibold text-xs flex items-center justify-center">D</div>
              <div>
                <pre className="text-[10px] text-indigo-500 border border-indigo-300 rounded-md px-3 py-1.5 max-w-[400px] whitespace-pre-wrap font-mono">
{`+------------+     +------------+     +------------+
|   Libro    |<>---|   Autor    |     |  Cliente   |
|------------|     |------------|     |------------|
| - titulo: String | - nombre: String | - nombre: String |
| - precio: Float  | - nacionalidad: String | - direccion: String |
| - autor: Autor   | - fechaNacimiento: Date | - telefono: String |
+------------+     +------------+     +------------+
| +prestar(): void | +escribir(): void | +registrar(): void |
+------------+     +------------+     | +realizarCompra():void |
                                      +------------+`}
                </pre>
                <p className="text-[8px] text-indigo-700 mt-1 ml-1">8:20 PM</p>
              </div>
            </div>
          </div>

          <form className="flex items-center border-t border-indigo-100 p-4 rounded-b-xl space-x-3">
            <input className="flex-grow rounded-md border border-indigo-200 text-sm p-2" placeholder="Escribe tu mensaje..." />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Enviar</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default PrincpipalNormalVisual;
