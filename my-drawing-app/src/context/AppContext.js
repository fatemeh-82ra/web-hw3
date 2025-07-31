import React, { createContext, useState, useCallback, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [drawingName, setDrawingName] = useState('Untitled Drawing');
    const [selectedShapeTool, setSelectedShapeTool] = useState(null);
    const [shapesOnCanvas, setShapesOnCanvas] = useState([]);

    const shapeCounts = useMemo(() => {
        const counts = { circle: 0, square: 0, triangle: 0 };
        shapesOnCanvas.forEach(shape => {
            if (counts[shape.type] !== undefined) {
                counts[shape.type]++;
            }
        });
        return counts;
    }, [shapesOnCanvas]);

    const addShapeToCanvasOnClick = useCallback((x, y) => {
        if (selectedShapeTool) {
            const newShape = {
                id: `${selectedShapeTool}-${Date.now()}`,
                type: selectedShapeTool,
                x: x,
                y: y,
            };
            setShapesOnCanvas(prevShapes => [...prevShapes, newShape]);
        }
    }, [selectedShapeTool]);

    const addShapeFromDrop = useCallback((shapeType, x, y) => {
        if (shapeType) {
            const newShape = {
                id: `${shapeType}-${Date.now()}`,
                type: shapeType,
                x: x,
                y: y,
            };
            setShapesOnCanvas(prevShapes => [...prevShapes, newShape]);
        }
    }, []);

    const removeShapeFromCanvas = useCallback((shapeId) => {
        setShapesOnCanvas(prevShapes => prevShapes.filter(shape => shape.id !== shapeId));
    }, []);

    const handleExport = useCallback(() => {
        const dataToExport = {
            drawingName: drawingName,
            shapes: shapesOnCanvas,
        };
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(dataToExport)
        )}`;
        const link = document.createElement('a');
        link.href = jsonString;
        link.download = `${drawingName.replace(/\s+/g, '_') || 'drawing'}.json`;
        link.click();
        link.remove();
    }, [drawingName, shapesOnCanvas]);

    const handleImport = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    if (importedData.drawingName && Array.isArray(importedData.shapes)) {
                        setDrawingName(importedData.drawingName);
                        setShapesOnCanvas(importedData.shapes);
                    } else {
                        alert('Invalid JSON file format.');
                    }
                } catch (error) {
                    alert('Error parsing JSON file: ' + error.message);
                }
            };
            reader.readAsText(file);
            if (event.target) {
                event.target.value = null; // Reset file input
            }
        }
    }, []);

    const contextValue = {
        drawingName,
        setDrawingName,
        selectedShapeTool,
        setSelectedShapeTool,
        shapesOnCanvas,
        shapeCounts,
        addShapeToCanvasOnClick,
        addShapeFromDrop,
        removeShapeFromCanvas,
        handleExport,
        handleImport,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};