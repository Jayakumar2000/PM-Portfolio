import { GoogleGenAI } from "@google/genai";

async function getLinkedInInfo() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Please summarize the professional background, role at Roanuz, key achievements, and professional journey of Jayakumar based on his LinkedIn profile: https://www.linkedin.com/in/jayakumarproductlead/. Focus on details that would be great for a 'Story' section of a portfolio website.",
    config: {
      tools: [{ urlContext: {} }]
    }
  });

  console.log(response.text);
}

getLinkedInInfo();
