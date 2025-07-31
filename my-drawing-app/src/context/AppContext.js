import React, { createContext, useState, useCallback, useMemo } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [drawingName, setDrawingName] = useState('Untitled Drawing');
    const [shapesOnCanvas, setShapesOnCanvas] = useState([]);
    const [selectedShapeTool, setSelectedShapeTool] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // ADDED: State for the logged-in user

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
            const newShape = { id: `${selectedShapeTool}-${Date.now()}`, type: selectedShapeTool, x, y };
            setShapesOnCanvas(prevShapes => [...prevShapes, newShape]);
        }
    }, [selectedShapeTool]);

    const addShapeFromDrop = useCallback((shapeType, x, y) => {
        if (shapeType) {
            const newShape = { id: `${shapeType}-${Date.now()}`, type: shapeType, x, y };
            setShapesOnCanvas(prevShapes => [...prevShapes, newShape]);
        }
    }, []);

    const removeShapeFromCanvas = useCallback((shapeId) => {
        setShapesOnCanvas(prevShapes => prevShapes.filter(shape => shape.id !== shapeId));
    }, []);

    // ADDED: Login handler
    const handleLogin = useCallback(async (username) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            const user = await response.json();
            setCurrentUser(user); // Set the logged-in user
            setDrawingName(`${user.username}'s Drawing`); // Set a default drawing name for the user
            setShapesOnCanvas([]); // Clear canvas for the new user
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }, []);

    // ADDED: Logout handler
    const handleLogout = useCallback(() => {
        setCurrentUser(null);
        setShapesOnCanvas([]);
        setDrawingName('Untitled Drawing');
        setSelectedShapeTool(null);
    }, []);

    // MODIFIED: handleSave now uses the logged-in user's ID
    const handleSave = useCallback(() => {
        if (!currentUser) {
            alert('You must be logged in to save.');
            return;
        }
        const dataToSave = { drawingName, shapes: shapesOnCanvas };

        fetch(`${API_BASE_URL}/drawings/${currentUser.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave),
        })
            .then(response => response.ok ? response.json() : Promise.reject('Save failed'))
            .then(savedData => {
                console.log('Drawing saved successfully:', savedData);
                alert('Drawing saved to server!');
            })
            .catch(error => {
                console.error('Error saving drawing:', error);
                alert('Error saving drawing: ' + error.message);
            });
    }, [drawingName, shapesOnCanvas, currentUser]);

    // MODIFIED: handleFetch now uses the logged-in user's ID
    const handleFetch = useCallback(() => {
        if (!currentUser) {
            alert('You must be logged in to load a drawing.');
            return;
        }
        fetch(`${API_BASE_URL}/drawings/${currentUser.id}`)
            .then(response => {
                if (response.status === 404) {
                    alert('No saved drawing found for this user.');
                    return null;
                }
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (data) {
                    setDrawingName(data.drawingName);
                    setShapesOnCanvas(data.shapes || []);
                    alert('Drawing loaded from server!');
                }
            })
            .catch(error => {
                console.error('Error fetching drawing:', error);
                alert('Error fetching drawing: ' + error.message);
            });
    }, [currentUser]);

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
        handleSave,
        handleFetch,
        currentUser, // ADDED
        handleLogin,  // ADDED
        handleLogout, // ADDED
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};