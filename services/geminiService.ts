
import { GoogleGenAI, Type } from "@google/genai";

export const generateItinerary = async (destination: string, days: number, interests: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Create a ${days}-day detailed travel itinerary for ${destination} for someone interested in ${interests}. Provide the response in Uzbek language.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            days: { type: Type.NUMBER },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  activities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  tips: { type: Type.STRING }
                },
                required: ["day", "activities", "tips"]
              }
            },
            totalEstimatedCost: { type: Type.STRING }
          },
          required: ["destination", "days", "itinerary", "totalEstimatedCost"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error (generateItinerary):", error);
    throw error;
  }
};

export const getQuickAdvice = async (question: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sen Di Travel nomli sayohat ilovasinining AI yordamchisisan. Quyidagi savolga qisqa va foydali javob ber: ${question}`,
      config: {
        systemInstruction: "Siz foydalanuvchilarga sayohat bo'yicha maslahatlar beruvchi do'stona va bilimli mutaxassissiz. Javoblar faqat o'zbek tilida bo'lishi kerak."
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error (getQuickAdvice):", error);
    return "Kechirasiz, hozirda javob bera olmayman.";
  }
};

export const generateDestImage = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional travel photograph of ${prompt}, high quality, cinematic lighting.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Gemini API Error (generateDestImage):", error);
  }
  return null;
};
