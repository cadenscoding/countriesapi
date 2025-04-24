import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css";

function Layout() {
  const [search, setSearch] = useState("");

  return (
    <div>
     
      <div className="header-container">
        <div className="header">
          <h1 className="header-title">Where in the world?</h1>
          <div className="header-menu">
            <Link to="/UserSaved" className="saved-clicker">
              <span className="menu-item heart-icon">❤️ Saved Countries</span>
            </Link>
            <span className="menu-item dark-mode-icon">🌙 Dark Mode</span>
          </div>
        </div>

        <div className="search-bar">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for a country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

    
      <Outlet context={{ search, setSearch }} />
    </div>
  );
}

export default Layout;
