import React, { useContext } from "react";
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

  const handleCardClick = (prompt) => {
    setInput(prompt);
    onSent(prompt);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
      e.preventDefault();
      onSent();
    }
  };

  const suggestedPrompts = [
    {
      title: "Code Review",
      prompt: "Review my code for best practices and suggest optimizations",
      icon: assets.code_icon
    },
    {
      title: "Debug Help",
      prompt: "Help me debug and fix issues in my application",
      icon: assets.bulb_icon
    },
    {
      title: "Architecture",
      prompt: "Design a scalable architecture for my project",
      icon: assets.compass_icon
    },
    {
      title: "Documentation",
      prompt: "Generate comprehensive documentation for my codebase",
      icon: assets.message_icon
    }
  ];

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 flex items-center justify-between 
                    px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800">
          TalkConnect AI
        </h1>
        <img 
          src={assets.user_icon} 
          alt="User" 
          className="w-9 h-9 rounded-full border border-gray-300"
        />
      </nav>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {!showResult ? (
          <>
            {/* Greeting Section */}
            <div className="my-12">
              <h2 className="text-3xl md:text-4xl text-gray-800 font-medium mb-2">
                Hello, Developer
              </h2>
              <p className="text-base text-gray-600">
                How can I help you today?
              </p>
            </div>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {suggestedPrompts.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(item.prompt)}
                  className="p-5 rounded-lg bg-white border border-gray-200
                           hover:border-gray-300 hover:shadow-md
                           transition-all duration-200 text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-gray-700 flex-1">
                      {item.prompt}
                    </p>
                    <div className="w-8 h-8 rounded-lg bg-gray-100 p-1.5 flex-shrink-0">
                      <img 
                        src={item.icon} 
                        alt={item.title}
                        className="w-full h-full object-contain opacity-70"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="my-6">
            {/* User Question */}
            <div className="flex items-start gap-4 p-4 mb-6 bg-white rounded-lg border border-gray-200">
              <img 
                src={assets.user_icon} 
                alt="User" 
                className="w-8 h-8 rounded-full border border-gray-300 flex-shrink-0"
              />
              <p className="text-base text-gray-800 leading-relaxed flex-1 pt-1">
                {recentPrompt}
              </p>
            </div>

            {/* AI Response */}
            <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <img 
                src={assets.gemini_icon} 
                alt="AI" 
                className="w-8 h-8 rounded-full border border-gray-300 flex-shrink-0"
              />
              
              {loading ? (
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-11/12 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-9/12 animate-pulse" />
                </div>
              ) : (
                <div 
                  className="flex-1 text-base leading-relaxed text-gray-700 pt-1"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
              )}
            </div>
          </div>
        )}

        {/* Input Section - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 
                      bg-white border-t border-gray-200 p-4 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 bg-gray-50 
                          px-4 py-3 rounded-full border border-gray-300
                          focus-within:border-blue-500 focus-within:bg-white
                          transition-all">
              <input
                type="text"
                placeholder="Message TalkConnect AI"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none 
                         text-sm text-gray-800 placeholder-gray-500"
              />
              
              <div className="flex items-center gap-2">
                <button className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
                        title="Attach file">
                  <img src={assets.gallery_icon} alt="Attach" />
                </button>
                
                <button className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"
                        title="Voice input">
                  <img src={assets.mic_icon} alt="Voice" />
                </button>
              </div>

              <button
                onClick={() => input.trim() && onSent()}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700
                         p-1.5 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed 
                         disabled:hover:bg-blue-600"
              >
                <img src={assets.send_icon} alt="Send" className="w-full h-full brightness-0 invert" />
              </button>
            </div>
            
            <p className="text-center text-xs text-gray-500 mt-3">
              AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
