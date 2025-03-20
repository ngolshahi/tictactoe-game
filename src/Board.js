// Board.js
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
    const board = [];
    
    for (let row = 0; row < size; row++) {
      const rowSquares = [];
      for (let col = 0; col < size; col++) {
        const i = row * size + col;
        rowSquares.push(
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            className={`square ${squares[i]?.toLowerCase() || ""}`}
            theme={theme}
            isAnimating={isAnimating && squares[i]}
          />
        );
      }
      board.push(
        <div key={row} className="board-row">
          {rowSquares}
        </div>
      );
    }
    
    return board;
  };

  return (
    <div 
      className="board" 
      data-size={size}
      style={{ 
        backgroundColor: theme.boardBg,
        borderColor: theme.boardBorder
      }}
    >
      {renderBoard()}
    </div>
  );
}