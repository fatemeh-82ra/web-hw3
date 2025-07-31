import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext";

function Header() {
    // Note we removed fileInputRef and handleImportClick
    const { drawingName, setDrawingName, handleSave, handleFetch } = useContext(AppContext);

    return (
        <header className="app-header">
            <input
                type="text"
                value={drawingName}
                onChange={(e) => setDrawingName(e.target.value)}
                placeholder="Painting Title"
                className="drawing-name-input"
            />
            <div>
                {/* Updated buttons */}
                <button onClick={handleSave} className="header-button">Save to Server</button>
                <button onClick={handleFetch} className="header-button">Load from Server</button>
            </div>
        </header>
    );
}

export default Header;