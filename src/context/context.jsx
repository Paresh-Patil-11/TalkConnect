import { createContext, useState } from "react";
import run from "../config/gemini";

const MyContext = createContext();

export { MyContext };

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState(""); // Stores the most recent prompt
    const [previousPrompt, setPreviousPrompt] = useState([]);  // Store the history of previous prompts
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        // Add the word to resultData instantly with no significant delay
        setResultData((prev) => prev + " " + nextWord);
    };

    const onSent = async () => {
        if (!input.trim()) return; // Prevent sending empty input
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input); // Set the most recent prompt

        try {
            const response = await run(input); // Call the `run` function
            let responseArray = response.split("**");
            let newResponse = ""; // Initialize newResponse

            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 === 0) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            // Replace '*' with '<br>' for line breaks
            let newResponse2 = newResponse.split("*").join("<br>");

            // Update state with the formatted response
            setResultData(newResponse2); // Use newResponse2, not newResponse
            let newResponseArray = newResponse2.split(" ");
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                // Add each word immediately with a very short delay
                setTimeout(() => delayPara(i, nextWord), i * 100); // Adjust the delay (100ms per word)
            }

            // Save the prompt to history (previous prompts)
            setPreviousPrompt((prevHistory) => {
                const updatedHistory = [...prevHistory, input]; // Add the current prompt to the history
                return updatedHistory;
            });

        } catch (error) {
            console.error("Error in onSent:", error.message);
            setResultData("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
            setInput(""); // Reset the input field after sending
        }
    };

    const contextValue = {
        previousPrompt,  // The history of previous prompts
        setPreviousPrompt,  // Function to update the history
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
