const API_URL = "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B";
const API_TOKEN = "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"; 

export const fetchChatResponse = async (message) => {
    console.log("Enviando petición a Hugging Face...");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: message })
        });

        const data = await response.json();
        console.log("Respuesta de Hugging Face:", data);

        return data[0]?.generated_text || "No se recibió respuesta válida";
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return "Ocurrió un error. Inténtalo de nuevo.";
    }
};
