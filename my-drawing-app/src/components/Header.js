import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext";

function Header() {
    const { drawingName, setDrawingName, handleSave, handleFetch, currentUser, handleLogout } = useContext(AppContext);

    return (
        <header className="app-header">
            <input
                type="text"
                value={drawingName}
                onChange={(e) => setDrawingName(e.target.value)}
                placeholder="Painting Title"
                className="drawing-name-input"
            />
            <div className="header-controls">
                <span className="user-info">Welcome, {currentUser.username}</span>
                <button onClick={handleSave} className="header-button">Save</button>
                <button onClick={handleFetch} className="header-button">Load</button>
                <button onClick={handleLogout} className="header-button logout-button">Logout</button>
            </div>
        </header>
    );
}

export default Header;