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
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    try {
      const response = await run(input);
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 === 0) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("<br>");

      setResultData(newResponse2);
      let newResponseArray = newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        setTimeout(() => delayPara(i, nextWord), i * 100);
      }

      setPreviousPrompt((prevHistory) => {
        const updatedHistory = [...prevHistory, input];
        return updatedHistory;
      });
    } catch (error) {
      console.error("Error in onSent:", error.message);
      setResultData("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setInput("");
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
