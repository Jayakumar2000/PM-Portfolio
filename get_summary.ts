import { GoogleGenAI } from "@google/genai";

async function getLinkedInSummary() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Find the professional summary and key achievements of Jayakumar (Product Lead at Roanuz) from his LinkedIn profile: https://www.linkedin.com/in/jayakumarproductlead/. Provide a detailed story for a portfolio website.",
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  console.log(response.text);
}

getLinkedInSummary();
