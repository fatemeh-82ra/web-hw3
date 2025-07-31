import React, { useContext } from 'react';
import {AppContext} from "../context/AppContext";

const SHAPES = [
    { id: 'circle', label: '● Circle' },
    { id: 'square', label: '■ Square' },
    { id: 'triangle', label: '▲ Triangle' },
];

function Sidebar() {
    const { selectedShapeTool, setSelectedShapeTool } = useContext(AppContext);

    const handleDragStart = (event, shapeId) => {
        event.dataTransfer.setData("application/react-shape-tool-type", shapeId);
        event.dataTransfer.effectAllowed = "copy";
    };

    return (
        <aside className="app-sidebar">
            <h3>Tools</h3>
            {SHAPES.map(shape => (
                <div
                    key={shape.id}
                    className={`shape-tool ${selectedShapeTool === shape.id ? 'selected' : ''}`}
                    onClick={() => setSelectedShapeTool(shape.id)}
                    title={`Drag to canvas to add ${shape.id}`}
                    draggable="true"
                    onDragStart={(event) => handleDragStart(event, shape.id)}
                >
                    {shape.id === 'circle' && <div className="tool-icon circle-icon"></div>}
                    {shape.id === 'square' && <div className="tool-icon square-icon"></div>}
                    {shape.id === 'triangle' && <div className="tool-icon triangle-icon"></div>}
                </div>
            ))}
        </aside>
    );
}

export default Sidebar;