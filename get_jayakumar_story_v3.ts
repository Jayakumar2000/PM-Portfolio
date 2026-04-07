import { GoogleGenAI } from "@google/genai";

async function getJayakumarStory() {
  // Use the API key provided in the system instruction if GEMINI_API_KEY is not available
  const apiKey = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE"; 
  if (apiKey === "YOUR_API_KEY_HERE") {
      console.log("No API key found. Please provide one.");
      return;
  }
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Write a detailed professional story for Jayakumar, who is a Product Lead at Roanuz. He has a background in data architecture and leads sports tech products. Mention his key achievements and his professional journey. This is for his portfolio website.",
  });

  console.log(response.text);
}

getJayakumarStory();
