// src/config/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;

// Initialize client with v1beta (browser-safe)
const genAI = new GoogleGenerativeAI(apiKey, { apiVersion: "v1beta" });

// Use a model that exists in v1beta
const model = genAI.getGenerativeModel({
  model: "text-bison-001", // v1beta compatible model
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
    return result.response.text();
  } catch (error) {
    console.error("Error in Gemini API:", error);
    if (error.message?.includes("API key")) {
      return "⚠️ Invalid API key. Check your VITE_API_KEY in environment variables.";
    } else if (error.message?.includes("quota")) {
      return "⚠️ API quota exceeded. Please try again later.";
    } else {
      return "⚠️ Sorry, I encountered an error. Please try again.";
    }
  }
}

export default run;
