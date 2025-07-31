import React from 'react';

function Shape({ id, type, x, y, onDoubleClick }) {
    const style = {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        onDoubleClick(id);
    };

    const shapeStyle = {
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
    };

    if (type === 'circle') {
        return (
            <div
                style={{ ...style, ...shapeStyle, borderRadius: '50%', backgroundColor: 'lightblue' }}
                onDoubleClick={handleDoubleClick}
                title={`Circle at (${x},${y})`}
            >
                {/* Circle */}
            </div>
        );
    } else if (type === 'square') {
        return (
            <div
                style={{ ...style, ...shapeStyle, backgroundColor: 'lightgreen' }}
                onDoubleClick={handleDoubleClick}
                title={`Square at (${x},${y})`}
            >
                {/* Square */}
            </div>
        );
    } else if (type === 'triangle') {
        return (
            <div
                style={{
                    ...style,
                    width: 0,
                    height: 0,
                    borderLeft: '25px solid transparent',
                    borderRight: '25px solid transparent',
                    borderBottom: '50px solid lightcoral',
                }}
                onDoubleClick={handleDoubleClick}
                title={`Triangle at (${x},${y})`}
            >
                {/* Triangle */}
            </div>
        );
    }

    return null;
}

export default Shape;