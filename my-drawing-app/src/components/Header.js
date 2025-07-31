import React, { useContext, useRef } from 'react';
import {AppContext} from "../context/AppContext";
function Header() {
    const { drawingName, setDrawingName, handleExport, handleImport } = useContext(AppContext);
    const fileInputRef = useRef(null);

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

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
                <button onClick={handleExport} className="header-button">Export</button>
                <button onClick={handleImportClick} className="header-button">Import</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImport}
                    accept=".json"
                    style={{ display: 'none' }}
                />
            </div>
        </header>
    );
}

export default Header;