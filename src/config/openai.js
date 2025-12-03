// src/config/openai.js
const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Make sure you set this in .env or Render

async function run(prompt) {
  try {
    if (!apiKey) throw new Error("Missing OpenAI API Key");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or "gpt-4"
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 2048,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI API:", error);
    if (error.message?.includes("API key")) {
      return "⚠️ Invalid API key. Please check your VITE_OPENAI_API_KEY.";
    } else if (error.message?.includes("quota")) {
      return "⚠️ API quota exceeded. Please try again later.";
    } else {
      return "⚠️ Sorry, I encountered an error. Please try again.";
    }
  }
}

export default run;
