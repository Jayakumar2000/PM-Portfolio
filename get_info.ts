import { GoogleGenAI } from "@google/genai";

async function getLinkedInInfo() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Search for the professional background of Jayakumar, Product Lead at Roanuz. Use his LinkedIn profile https://www.linkedin.com/in/jayakumarproductlead/ as a reference. Summarize his role at Roanuz, his key achievements, and his professional journey.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    console.log(response.text);
  } catch (error) {
    console.error("Error fetching info:", error);
  }
}

getLinkedInInfo();
