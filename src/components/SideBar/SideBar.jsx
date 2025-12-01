import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { MyContext } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { previousPrompt, newChat, setInput, onSent } = useContext(MyContext);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setExtended(!extended);
    }
  };

  const loadPrompt = (prompt) => {
    setInput(prompt);
    onSent(prompt);
    if (isMobile) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:relative top-0 left-0 h-screen z-50
          bg-dark/95 backdrop-blur-xl border-r border-primary/20
          flex flex-col p-6 transition-all duration-300
          ${extended && !isMobile ? 'w-64' : 'w-20'}
          ${isMobile ? (mobileOpen ? 'translate-x-0' : '-translate-x-full') : ''}
        `}
      >
        {/* Top Section */}
        <div className="flex-1">
          {/* Menu Button */}
          <button
            onClick={handleMenuClick}
            className="w-7 h-7 mb-8 opacity-80 hover:opacity-100 
                     hover:bg-primary/10 rounded-lg p-1 transition-all"
          >
            <img 
              src={assets.menu_icon} 
              alt="Menu" 
              className="w-full h-full brightness-0 invert"
            />
          </button>

          {/* New Chat Button */}
          <button
            onClick={newChat}
            className="flex items-center justify-center gap-3 w-full
                     bg-gradient-to-r from-primary to-secondary
                     text-white rounded-xl px-5 py-3.5 mb-6
                     font-semibold text-[15px] shadow-lg shadow-primary/30
                     hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5
                     active:translate-y-0 transition-all duration-200"
          >
            <img 
              src={assets.plus_icon} 
              alt="New" 
              className="w-5 h-5 brightness-0 invert"
            />
            {(extended || (isMobile && mobileOpen)) && <span>New Chat</span>}
          </button>

          {/* Recent Chats */}
          {(extended || (isMobile && mobileOpen)) && previousPrompt.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs text-white/60 font-bold uppercase tracking-wider mb-3 px-3">
                Recent
              </h3>
              <div className="space-y-1">
                {previousPrompt.slice(-5).reverse().map((item, index) => (
                  <button
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className="flex items-center gap-3 w-full p-3 rounded-lg
                             border border-transparent hover:bg-primary/10 
                             hover:border-primary/30 hover:translate-x-1
                             transition-all duration-200 group"
                  >
                    <img 
                      src={assets.message_icon} 
                      alt="" 
                      className="w-[18px] h-[18px] opacity-70 brightness-0 invert
                               group-hover:opacity-100 transition-opacity"
                    />
                    <p className="text-sm text-white/85 truncate group-hover:text-white">
                      {item.substring(0, 30)}{item.length > 30 ? '...' : ''}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary/20 pt-5 space-y-1">
          <button
            className="flex items-center gap-3 w-full p-3 rounded-lg
                     border border-transparent hover:bg-primary/10 
                     hover:border-primary/30 hover:translate-x-1
                     transition-all duration-200 group"
          >
            <img 
              src={assets.question_icon} 
              alt="Help" 
              className="w-[18px] h-[18px] opacity-70 brightness-0 invert
                       group-hover:opacity-100 transition-opacity"
            />
            {(extended || (isMobile && mobileOpen)) && (
              <span className="text-sm text-white/85 group-hover:text-white">Help</span>
            )}
          </button>

          <button
            className="flex items-center gap-3 w-full p-3 rounded-lg
                     border border-transparent hover:bg-primary/10 
                     hover:border-primary/30 hover:translate-x-1
                     transition-all duration-200 group"
          >
            <img 
              src={assets.history_icon} 
              alt="Activity" 
              className="w-[18px] h-[18px] opacity-70 brightness-0 invert
                       group-hover:opacity-100 transition-opacity"
            />
            {(extended || (isMobile && mobileOpen)) && (
              <span className="text-sm text-white/85 group-hover:text-white">Activity</span>
            )}
          </button>

          <button
            className="flex items-center gap-3 w-full p-3 rounded-lg
                     border border-transparent hover:bg-primary/10 
                     hover:border-primary/30 hover:translate-x-1
                     transition-all duration-200 group"
          >
            <img 
              src={assets.setting_icon} 
              alt="Settings" 
              className="w-[18px] h-[18px] opacity-70 brightness-0 invert
                       group-hover:opacity-100 transition-opacity"
            />
            {(extended || (isMobile && mobileOpen)) && (
              <span className="text-sm text-white/85 group-hover:text-white">Settings</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;