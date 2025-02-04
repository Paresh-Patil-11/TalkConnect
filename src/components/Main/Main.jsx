import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { MyContext } from "../../context/context";

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
    } = useContext(MyContext);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets?.user_icon || ""} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p>
                                <span>Hello, User</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets?.compass_icon || ""} alt="Compass Icon" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: Coding Knowledge</p>
                                <img src={assets?.bulb_icon || ""} alt="Bulb Icon" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our next work retreat</p>
                                <img src={assets?.message_icon || ""} alt="Message Icon" />
                            </div>
                            <div className="card">
                                <p>Improve the readability of the following code</p>
                                <img src={assets?.code_icon || ""} alt="Code Icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets?.user_icon || ""} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets?.gemini_icon || ""} alt="Gemini Icon" />
                            {loading ? <div className="loader">
                                <hr></hr>
                                <hr></hr>
                                <hr></hr>
                            </div> : (
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: resultData || "No result available.",
                                    }}
                                ></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Enter a prompt here"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div>
                            <img src={assets?.gallery_icon || ""} alt="Gallery Icon" />
                            <img src={assets?.mic_icon || ""} alt="Mic Icon" />
                            <img
                                src={assets?.send_icon || ""}
                                alt="Send Icon"
                                onClick={onSent}
                            />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate information. Please verify with a
                        professional before making any decisions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
