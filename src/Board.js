import { useState, useEffect } from "react";
import Square from "./Square";

export default function Board({ size = 3, xIsNext, squares, onPlay, isAnimating, gameOver, theme }) {
  function handleClick(i) {
    if (squares[i] || gameOver || isAnimating) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  // Create a board with dynamic size
  const renderBoard = () => {
    const boardRows = [];
    
    for (let row = 0; row < size; row++) {
      const rowSquares = [];
      for (let col = 0; col < size; col++) {
        const i = row * size + col;
        rowSquares.push(renderSquare(i));
      }
      boardRows.push(
        <div key={row} className="board-row">
          {rowSquares}
        </div>
      );
    }
    
    return boardRows;
  };

  const renderSquare = (i) => {
    const value = squares[i];
    const squareClass = `square ${value?.toLowerCase() || ""}`;
    
    return (
      <Square
        key={i}
        value={value}
        onSquareClick={() => handleClick(i)}
        className={squareClass}
        theme={theme}
        isAnimating={isAnimating && value}
      />
    );
  };

  return (
    <div 
      className="board" 
      style={{ 
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        backgroundColor: theme.boardBg,
        borderColor: theme.boardBorder
      }}
    >
      {renderBoard()}
    </div>
  );
}