import React, { createContext, useState, useCallback, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [drawingName, setDrawingName] = useState('Untitled Drawing');
    const [selectedShapeTool, setSelectedShapeTool] = useState(null);
    const [shapesOnCanvas, setShapesOnCanvas] = useState([]);


    const CURRENT_USER_ID = 1;
    const API_BASE_URL = 'http://localhost:8080/api';

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

    const handleSave = useCallback(() => {
        const dataToSave = {
            drawingName: drawingName,
            shapes: shapesOnCanvas,
        };

        fetch(`${API_BASE_URL}/drawings/${CURRENT_USER_ID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSave),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(savedData => {
                console.log('Drawing saved successfully:', savedData);
                alert('Drawing saved to server!');
            })
            .catch(error => {
                console.error('Error saving drawing:', error);
                alert('Error saving drawing: ' + error.message);
            });
    }, [drawingName, shapesOnCanvas]);

    // REPLACED: This function now fetches the drawing from the server.
    const handleFetch = useCallback(() => {
        fetch(`${API_BASE_URL}/drawings/${CURRENT_USER_ID}`)
            .then(response => {
                if (response.status === 404) {
                    alert('No saved drawing found for this user.');
                    return null;
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.drawingName && Array.isArray(data.shapes)) {
                    setDrawingName(data.drawingName);
                    setShapesOnCanvas(data.shapes);
                    alert('Drawing loaded from server!');
                }
            })
            .catch(error => {
                console.error('Error fetching drawing:', error);
                alert('Error fetching drawing: ' + error.message);
            });
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
        handleSave, // Use the new function
        handleFetch, // Use the new function
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};