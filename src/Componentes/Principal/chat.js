import { fetchPlantUMLCode } from "./deepseek_service"; 

export const getPlantUMLDiagram = async (message) => {
    return await fetchPlantUMLCode(message);
};
