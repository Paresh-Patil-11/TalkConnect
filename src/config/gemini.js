import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey, { apiVersion: "v1" });
const model = genAI.getGenerativeModel({
  model: "gemini-pro", 
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

    // User-friendly error messages
    if (error.message?.includes("API key")) {
      return "⚠️ Invalid API key. Please get a new API key from https://makersuite.google.com/app/apikey";
    } else if (error.message?.includes("quota")) {
      return "⚠️ API quota exceeded. Please try again later or check your quota at https://makersuite.google.com/app/apikey";
    } else {
      return "⚠️ Sorry, I encountered an error. Please try again.";
    }
  }
}

export default run;
