import { fetchChatResponse } from "./ai_api";

export const fetchPlantUMLCode = async (message) => {
    const responseText = await fetchChatResponse(message);

    // Buscar solo el código dentro de @startuml y @enduml
    const match = responseText.match(/@startuml([\s\S]*?)@enduml/);

    if (match) {
        return `@startuml${match[1]}@enduml`; // Devolver solo el UML encontrado
    } else {
        return "@startuml\n// No se generó un diagrama válido\n@enduml";
    }
};
