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
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:relative top-0 left-0 h-screen z-50
          bg-white border-r border-gray-200
          flex flex-col transition-all duration-300
          ${extended && !isMobile ? 'w-64' : 'w-16'}
          ${isMobile ? (mobileOpen ? 'translate-x-0' : '-translate-x-full') : ''}
        `}
      >
        {/* Top Section */}
        <div className="flex-1 p-3">
          {/* Menu Button */}
          <button
            onClick={handleMenuClick}
            className="w-10 h-10 mb-4 flex items-center justify-center
                     hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img 
              src={assets.menu_icon} 
              alt="Menu" 
              className="w-5 h-5 opacity-70"
            />
          </button>

          {/* New Chat Button */}
          <button
            onClick={newChat}
            className="flex items-center justify-center gap-2 w-full
                     bg-white border border-gray-300 hover:bg-gray-50
                     text-gray-700 rounded-lg px-3 py-2.5 mb-4
                     text-sm font-medium transition-colors"
          >
            <img 
              src={assets.plus_icon} 
              alt="New" 
              className="w-4 h-4 opacity-70"
            />
            {(extended || (isMobile && mobileOpen)) && <span>New chat</span>}
          </button>

          {/* Recent Chats */}
          {(extended || (isMobile && mobileOpen)) && previousPrompt.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs text-gray-500 font-medium px-3 mb-2">
                Recent
              </h3>
              <div className="space-y-1">
                {previousPrompt.slice(-5).reverse().map((item, index) => (
                  <button
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className="flex items-center gap-3 w-full p-2.5 rounded-lg
                             text-gray-700 hover:bg-gray-100 transition-colors
                             text-left"
                  >
                    <img 
                      src={assets.message_icon} 
                      alt="" 
                      className="w-4 h-4 opacity-60 flex-shrink-0"
                    />
                    <p className="text-sm truncate">
                      {item.substring(0, 30)}{item.length > 30 ? '...' : ''}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-3 space-y-1">
          <button
            className="flex items-center gap-3 w-full p-2.5 rounded-lg
                     text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <img 
              src={assets.question_icon} 
              alt="Help" 
              className="w-4 h-4 opacity-60"
            />
            {(extended || (isMobile && mobileOpen)) && (
              <span className="text-sm">Help</span>
            )}
          </button>

          <button
            className="flex items-center gap-3 w-full p-2.5 rounded-lg
                     text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <img 
              src={assets.history_icon} 
              alt="Activity" 
              className="w-4 h-4 opacity-60"
            />
            {(extended || (isMobile && mobileOpen)) && (
              <span className="text-sm">Activity</span>
            )}
          </button>

          <button
            className="flex items-center gap-3 w-full p-2.5 rounded-lg
                     text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <img 
              src={assets.setting_icon} 
              alt="Settings" 
              className="w-4 h-4 opacity-60"
            />
            {(extended || (isMobile && mobileOpen)) && (
              <span className="text-sm">Settings</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
