import React, { useState, useContext } from 'react';
import Shape from './Shape';
import {AppContext} from "../context/AppContext";

function Canvas() {
    const {
        shapesOnCanvas,
        addShapeToCanvasOnClick,
        removeShapeFromCanvas,
        addShapeFromDrop
    } = useContext(AppContext);

    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleCanvasClickInternal = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }
        if (addShapeToCanvasOnClick) {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            addShapeToCanvasOnClick(x, y);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        const shapeType = event.dataTransfer.getData("application/react-shape-tool-type");

        // Ensure addShapeFromDrop from context is used
        if (shapeType && addShapeFromDrop) {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            addShapeFromDrop(shapeType, x, y);
        }
    };

    return (
        <div
            className={`canvas-area ${isDraggingOver ? 'drag-over' : ''}`}
            onClick={handleCanvasClickInternal}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <p className="canvas-placeholder">{shapesOnCanvas.length === 0 ? 'Canvas' : ''}</p>
            {shapesOnCanvas.map(shape => (
                <Shape
                    key={shape.id}
                    id={shape.id}
                    type={shape.type}
                    x={shape.x}
                    y={shape.y}
                    onDoubleClick={removeShapeFromCanvas}
                />
            ))}
        </div>
    );
}

export default Canvas;