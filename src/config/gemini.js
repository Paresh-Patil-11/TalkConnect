import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBzji4oFM5sUXSDgdNjm4gHE2j9sfHmkxI";
const genAI = new GoogleGenerativeAI(apiKey);

// Updated model name - use gemini-1.5-flash or gemini-1.5-pro
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Changed from "gemini-pro"
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    console.error("Error details:", error.message);
    throw error;
  }
}

export default run;
