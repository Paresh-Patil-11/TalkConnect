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
    const currentPrompt = prompt !== undefined ? prompt : input;
    
    if (!currentPrompt.trim()) {
      return;
    }

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

      // Format response with bold text
      let responseArray = response.split("**");
      let newResponse = "";
      
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      
      // Format response with line breaks
      let newResponse2 = newResponse.split("*").join("<br/>");
      
      // Add typing effect
      let newResponseArray = newResponse2.split(" ");
      
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

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

  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
