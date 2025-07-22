import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";

const SideBar = () => {
  const [extended, setExtended] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <>
      {isMobile && mobileOpen && (
        <div 
          className="sidebar-overlay active" 
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`sidebar ${!extended && !isMobile ? 'collapsed' : ''} ${isMobile && mobileOpen ? 'mobile-open' : ''}`}>
      <div className="top">
        <img
          onClick={handleMenuClick}
          className="menu"
          src={assets.menu_icon}
          alt="menuIcon"
        />
        <div className="newChat">
          <img src={assets.plus_icon} alt="chatIcon" />
          {(extended || (isMobile && mobileOpen)) ? <p>New Chat</p> : null}
        </div>
        {(extended || (isMobile && mobileOpen)) ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>React component help...</p>
            </div>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>JavaScript ES6 features...</p>
            </div>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>Code review request...</p>
            </div>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>API documentation...</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {(extended || (isMobile && mobileOpen)) ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {(extended || (isMobile && mobileOpen)) ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {(extended || (isMobile && mobileOpen)) ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
    </>
  );
};

export default SideBar;
