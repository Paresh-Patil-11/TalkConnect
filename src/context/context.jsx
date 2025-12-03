// src/context/MyContext.js
import { createContext, useState } from "react";
import run from "../config/gemini";

const MyContext = createContext();
export { MyContext };

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 50 * index);
  };

  const newChat = () => {
    setShowResult(false);
    setLoading(false);
    setInput("");
    setResultData("");
    setRecentPrompt("");
  };

  const onSent = async (prompt) => {
    const currentPrompt = prompt ?? input;

    if (!currentPrompt.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);

    if (!prompt) setPreviousPrompt((prev) => [...prev, currentPrompt]);

    try {
      const response = await run(currentPrompt);

      if (!response) throw new Error("Empty response from API");

      // Simple formatting: bold ** and line breaks *
      const formatted = response
        .split("**")
        .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
        .join("")
        .split("*")
        .join("<br/>");

      // Typing effect
      formatted.split(" ").forEach((word, i) => delayPara(i, word + " "));

    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData(
        "⚠️ Sorry, I encountered an error processing your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider
      value={{
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
