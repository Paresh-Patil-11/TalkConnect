import React, { useContext, useState } from "react";
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
    <div className="flex-1 min-h-screen pb-[15vh] relative">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 flex items-center justify-between 
                    px-10 py-5 text-white bg-dark/80 backdrop-blur-xl 
                    border-b border-primary/10">
        <h1 className="text-xl md:text-2xl font-semibold 
                     bg-gradient-to-r from-primary to-secondary 
                     bg-clip-text text-transparent">
          TalkConnect AI
        </h1>
        <img 
          src={assets.user_icon} 
          alt="User" 
          className="w-9 md:w-11 h-9 md:h-11 rounded-full 
                   border-2 border-primary/50 shadow-lg shadow-primary/30
                   hover:scale-105 hover:border-secondary/70 transition-all"
        />
      </nav>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        {!showResult ? (
          <>
            {/* Greeting Section */}
            <div className="my-16 text-center px-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white 
                           font-bold mb-3 leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-pink-500 
                               bg-clip-text text-transparent animate-gradient">
                  Hello, Developer
                </span>
              </h2>
              <p className="text-base md:text-lg text-white/70 mt-2">
                How can I assist you today?
              </p>
            </div>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
                          gap-5 px-5 mb-10">
              {suggestedPrompts.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(item.prompt)}
                  className="relative h-44 p-6 rounded-2xl overflow-hidden
                           bg-darker/60 backdrop-blur-xl border border-primary/20
                           hover:bg-darker/80 hover:border-primary/40 
                           hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/25
                           transition-all duration-300 group"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full 
                                group-hover:translate-x-full transition-transform duration-700
                                bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  <p className="text-sm md:text-base text-white font-medium 
                              leading-relaxed pr-12">
                    {item.prompt}
                  </p>
                  
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl
                                bg-gradient-to-r from-primary to-secondary p-2
                                shadow-lg shadow-primary/40
                                group-hover:rotate-12 group-hover:scale-110 
                                transition-all duration-300">
                    <img 
                      src={item.icon} 
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="my-5 max-h-[65vh] overflow-y-auto custom-scrollbar
                        bg-darker/40 backdrop-blur-xl rounded-2xl 
                        border border-primary/20 p-5">
            {/* User Question */}
            <div className="flex items-start gap-4 p-5 mb-5 
                          bg-darker/60 rounded-xl border border-primary/20">
              <img 
                src={assets.user_icon} 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-primary/40 flex-shrink-0"
              />
              <p className="text-base md:text-lg text-white font-semibold leading-relaxed flex-1">
                {recentPrompt}
              </p>
            </div>

            {/* AI Response */}
            <div className="flex gap-4 p-6 bg-dark/60 rounded-xl border border-primary/15">
              <img 
                src={assets.gemini_icon} 
                alt="AI" 
                className="w-10 h-10 rounded-full border-2 border-secondary/40 flex-shrink-0"
              />
              
              {loading ? (
                <div className="flex-1 space-y-3">
                  <div className="h-3 bg-gradient-to-r from-primary/30 via-secondary/60 to-primary/30 
                                rounded-md animate-pulse bg-[length:200%_100%]" 
                       style={{ animationDuration: '1.5s' }} />
                  <div className="h-3 bg-gradient-to-r from-primary/30 via-secondary/60 to-primary/30 
                                rounded-md animate-pulse bg-[length:200%_100%] w-11/12" 
                       style={{ animationDuration: '1.5s', animationDelay: '0.2s' }} />
                  <div className="h-3 bg-gradient-to-r from-primary/30 via-secondary/60 to-primary/30 
                                rounded-md animate-pulse bg-[length:200%_100%] w-9/12" 
                       style={{ animationDuration: '1.5s', animationDelay: '0.4s' }} />
                </div>
              ) : (
                <div 
                  className="flex-1 text-base md:text-lg leading-relaxed text-white/90
                           prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                />
              )}
            </div>
          </div>
        )}

        {/* Input Section - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 
                      bg-dark/95 backdrop-blur-xl border-t border-primary/20 
                      p-5 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-darker/80 
                          px-5 py-3 rounded-full border-2 border-primary/30
                          focus-within:border-primary/60 focus-within:shadow-lg 
                          focus-within:shadow-primary/30 transition-all">
              <input
                type="text"
                placeholder="Ask me anything about development..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none 
                         text-sm md:text-base text-white placeholder-white/50
                         font-medium"
              />
              
              <div className="flex items-center gap-2">
                <button className="w-5 h-5 opacity-70 hover:opacity-100 
                                 hover:bg-primary/10 rounded-lg p-0.5 transition-all"
                        title="Attach file">
                  <img src={assets.gallery_icon} alt="Attach" />
                </button>
                
                <button className="w-5 h-5 opacity-70 hover:opacity-100 
                                 hover:bg-primary/10 rounded-lg p-0.5 transition-all"
                        title="Voice input">
                  <img src={assets.mic_icon} alt="Voice" />
                </button>
              </div>

              <button
                onClick={() => input.trim() && onSent()}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary
                         p-1.5 transition-all
                         hover:scale-110 hover:shadow-lg hover:shadow-primary/50
                         disabled:opacity-40 disabled:cursor-not-allowed 
                         disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <img src={assets.send_icon} alt="Send" className="w-full h-full" />
              </button>
            </div>
            
            <p className="text-center text-xs text-white/50 mt-3">
              TalkConnect AI may produce inaccurate information. Verify important details.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Main;