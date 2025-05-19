import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Principal0Visual.css"

const BajaVisionPrincipal = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#5C5CE5] min-h-screen flex flex-col font-[Inter]">
      <header className="flex justify-end items-center h-14 px-6 bg-[#5C5CE5] text-white space-x-6">
        <button aria-label="Notifications" className="text-white text-lg">
          <i className="fas fa-bell"></i>
        </button>
        <button aria-label="User Profile" className="text-white text-lg">
          <i className="fas fa-user"></i>
        </button>
      </header>

      <main className="flex flex-1 max-w-[1200px] mx-auto my-6 px-4 gap-6">
        {/*Panel izquierdo */}
        <section className="bg-white rounded-lg shadow-sm w-[280px] flex flex-col min-h-[600px]">
          <div className="p-4 border-b border-gray-200 text-sm text-gray-700 font-normal">
            Sistema UML
          </div>
          <div className="flex items-center px-4 py-2 border-b border-gray-200">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 flex-1 text-gray-500 text-xs">
              <i className="fas fa-search mr-2"></i>
              <input
                type="text"
                placeholder="Buscar chat"
                className="bg-transparent outline-none w-full text-xs"
                aria-label="Buscar chat"
              />
            </div>
            <button
              onClick={() => navigate('/nuevo-chat')}
              className="text-[#5C5CE5] text-xs font-semibold ml-3 flex items-center space-x-1"
              aria-label="Chat plus"
            >
              <span>CHAT</span>
              <span className="text-sm font-bold">+</span>
            </button>
          </div>

          <nav className="flex flex-col divide-y divide-gray-200 text-xs text-gray-700 font-normal">
            <button className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 focus:bg-gray-50">
              <span className="truncate">Diagramas de clase</span>
              <i className="fas fa-play text-gray-400"></i>
            </button>
            <button className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 focus:bg-gray-50">
              <div>
                <span className="font-semibold">Diagrama de objetos</span>
                <span className="ml-1 text-gray-400 font-normal">Ejecutando</span>
              </div>
              <div className="text-gray-400 text-[10px] font-normal tracking-wide">00:31:00</div>
              <i className="fas fa-play text-gray-400 ml-2"></i>
            </button>
          </nav>
        </section>

        {/* Panel derecho */}
        <section className="flex-1 bg-white rounded-lg shadow-sm flex flex-col min-h-[600px]">
          <header className="flex justify-between items-center border-b border-gray-200 px-6 py-4 text-xs text-gray-700 font-semibold">
            <div>
              <div>Diagramas de clase</div>
              <div className="text-[9px] font-normal text-gray-500 mt-0.5">#CLU6798H</div>
            </div>
            <button
              aria-label="Info"
              className="w-6 h-6 rounded-full border border-gray-300 text-gray-500 flex justify-center items-center text-xs font-semibold"
            >
              i
            </button>
          </header>

          <div className="flex flex-col px-6 py-4 space-y-6 overflow-y-auto flex-1">
            {/* ejemplo de mensaje 1 */}
            <div className="flex items-start space-x-3 max-w-[600px]">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5C5CE5] text-white text-[10px] font-semibold flex justify-center items-center pt-[1px]">
                D
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-[#5C5CE5] border border-[#5C5CE5] rounded-md px-3 py-1">
                  Dime la distribución del diagrama de clases
                </div>
                <div className="text-[8px] text-gray-400 mt-1">8:00 PM</div>
              </div>
            </div>

            {/* Ejemplo de mensaje 2 */}
            <div className="flex items-start space-x-3 max-w-[600px] justify-end">
              <div className="text-[10px] text-white bg-[#5C5CE5] rounded-md px-3 py-2 max-w-[400px] leading-tight">
                Una clase: Libro con atributos como el título, autor, precio y métodos
                como prestar. La clase autor con atributos como nombre, nacionalidad,
                y fecha de nacimiento, además de un método como escribir. La clase
                cliente tiene atributos como nombre, dirección, número de teléfono y
                métodos como registrar() y realizarCompra().
              </div>
            </div>

            {/* Ejemplo de mensaje 3 */}
            <div className="flex items-start space-x-3 max-w-[600px]">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5C5CE5] text-white text-[10px] font-semibold flex justify-center items-center pt-[1px]">
                D
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-[#5C5CE5] border border-[#5C5CE5] rounded-md px-3 py-2 max-w-[400px] overflow-x-auto">
                  <pre className="whitespace-pre-wrap font-mono text-[9px] leading-[1.1] text-[#5C5CE5]">
{`+----------------+       +----------------+       +----------------+
|     Libro      |       |     Autor      |       |    Cliente     |
+----------------+       +----------------+       +----------------+
| - titulo: String|       | - nombre: String|       | - nombre: String|
| - precio: Float |       | - nacionalidad: String| | - direccion: String|
| - autor: Autor  |       | - fechaNacimiento: Date| | - telefono: String|
+----------------+       +----------------+       +----------------+
| + prestar(): void|       | + escribir(): void|     | + registrar(): void|
|                  |       |                  |     | + realizarCompra(): void|
+----------------+       +----------------+       +----------------+`}
                  </pre>
                </div>
                <div className="text-[8px] text-gray-400 mt-1">8:20 PM</div>
              </div>
            </div>

            {/* Ejemplo de mensaje 4 */}
            <div className="flex items-center space-x-3 max-w-[600px]">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5C5CE5] text-white text-[10px] font-semibold flex justify-center items-center pt-[1px]">
                OP
              </div>
              <div className="flex-1 border-t border-gray-300 pt-2 text-[10px] text-gray-400 font-semibold">
                ...
              </div>
            </div>
          </div>
        </section>
      </main>

      <button
        aria-label="Voice input"
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-white shadow-lg flex justify-center items-center text-[#5C5CE5] text-3xl"
      >
        <i className="fas fa-microphone"></i>
      </button>
    </div>
  );
};

export default BajaVisionPrincipal;
