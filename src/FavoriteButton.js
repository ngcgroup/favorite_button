import React, { useState } from 'react';

function FavoriteButton({ shape, size, color }) {
  const [currentShape, setCurrentShape] = useState(shape);
  const [currentSize, setCurrentSize] = useState(size);
  const [currentColor, setCurrentColor] = useState(color);

  const handleShapeChange = (newShape) => {
    setCurrentShape(newShape);
  };

  const handleSizeChange = (newSize) => {
    setCurrentSize(newSize);
  };

  const handleColorChange = (newColor) => {
    setCurrentColor(newColor);
  };

  return (
    <button
      className={`favorite-button ${currentShape} ${currentSize}`}
      style={{ backgroundColor: currentColor }}
      onClick={() => console.log('Button clicked!')}
    >
      Favorite
    </button>
  );
}

export default FavoriteButton;
