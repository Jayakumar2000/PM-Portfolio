import { GoogleGenAI } from "@google/genai";

async function getJayakumarStory() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Based on your knowledge, please provide a detailed professional summary of Jayakumar, who is a Product Lead at Roanuz. He has a background in data architecture and leads sports tech products. Mention his key achievements and his professional journey. This is for his portfolio website.",
  });

  console.log(response.text);
}

getJayakumarStory();
