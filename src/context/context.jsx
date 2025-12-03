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

  // Typing effect
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 50 * index);
  };

  // Reset chat
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

    if (prompt === undefined) {
      setPreviousPrompt((prev) => [...prev, currentPrompt]);
      setInput("");
    }

    try {
      const response = await run(currentPrompt);

      if (!response) {
        throw new Error("Empty response received from API");
      }

      // Simple formatting: bold with ** and line breaks with *
      const formatted = response
        .split("**")
        .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
        .join("")
        .split("*")
        .join("<br/>");

      // Typing effect word by word
      const words = formatted.split(" ");
      words.forEach((word, i) => delayPara(i, word + " "));

    } catch (error) {
      console.error("Error in onSent:", error);
      setResultData("⚠️ Sorry, I encountered an error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
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
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export default ContextProvider;
