import { GoogleGenAI } from "@google/genai";

async function getJayakumarStory() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Write a detailed professional story for Jayakumar, who is a Product Lead at Roanuz. Use his LinkedIn profile (https://www.linkedin.com/in/jayakumarproductlead/) as a reference. Include his journey from data architecture to product leadership, his achievements at Roanuz (like leading sports tech products), and his philosophy of blending data with storytelling. Make it suitable for a high-end portfolio website 'Story' section.",
  });

  console.log(response.text);
}

getJayakumarStory();
