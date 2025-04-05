import { createContext, useState } from "react";
import run from "../config/gemini";

const MyContext = createContext();
export { MyContext };

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setResultData((prev) => prev + " " + nextWord);
  };

  const onSent = async () => {
    if (!input.trim()) return;
    setResultData(""); // clear any previous data
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    try {
      const response = await run(input);
      if (!response) throw new Error("Empty response from Gemini API.");

      // Format bold text using Markdown-style "**" to HTML <b>
      let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

      // Replace single asterisk '*' with line breaks
      formattedResponse = formattedResponse.replace(/\*/g, "<br>");

      // Animate word-by-word output
      const words = formattedResponse.split(" ");
      setResultData(""); // start with empty string before animation

      words.forEach((word, i) => {
        setTimeout(() => delayPara(i, word), i * 100);
      });

      // Save prompt history
      setPreviousPrompt((prevHistory) => [...prevHistory, input]);
    } catch (error) {
      console.error("Error in onSent:", error.message);
      setResultData("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setInput(""); // clear input field
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
  };

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
