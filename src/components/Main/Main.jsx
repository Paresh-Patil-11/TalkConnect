import React, { useContext, useEffect, useState } from "react";
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

  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setSidebarCollapsed(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (prompt) => {
    setInput(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSent();
    }
  };

  const quickActions = [
    "💡 Explain concept",
    "🔧 Debug code", 
    "📝 Write documentation",
    "🎨 Design ideas",
    "🚀 Optimize performance"
  ];

  const handleQuickAction = (action) => {
    setInput(action.replace(/[💡🔧📝🎨🚀]\s/, ''));
  };
  return (
    <div className="main">
      <div className="nav">
        <p>✨ AI Development Assistant</p>
        <img src={assets?.user_icon || ""} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Welcome, Developer!</span>
              </p>
             
            </div>
            <div className="cards">
              <div className="card" onClick={() => handleCardClick("Help me create a responsive React component")}>
                <p>Help me create a responsive React component</p>
                <img src={assets?.compass_icon || ""} alt="Compass Icon" />
              </div>
              <div className="card" onClick={() => handleCardClick("Explain modern JavaScript ES6+ features")}>
                <p>Explain modern JavaScript ES6+ features</p>
                <img src={assets?.bulb_icon || ""} alt="Bulb Icon" />
              </div>
              <div className="card" onClick={() => handleCardClick("Review my code for best practices and optimization")}>
                <p>
                  Review my code for best practices and optimization
                </p>
                <img src={assets?.message_icon || ""} alt="Message Icon" />
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
              {loading ? (
                <div className="loader">
                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: resultData || "No result available.",
                  }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className={`main-bottom ${sidebarCollapsed && !isMobile ? 'sidebar-collapsed' : ''}`}>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <div 
                key={index}
                className="quick-action"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </div>
            ))}
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Ask me anything about development..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="input-controls">
              <img src={assets?.gallery_icon || ""} alt="Gallery Icon" />
              <img src={assets?.mic_icon || ""} alt="Mic Icon" />
            </div>
            <div>
              <img
                className={`send-button ${!input.trim() ? 'disabled' : ''}`}
                src={assets?.send_icon || ""}
                alt="Send Icon"
                onClick={onSent}
                disabled={!input.trim()}
              />
            </div>
          </div>
          <p className="bottom-info">
           Built with 🤍 by Paresh for developers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
