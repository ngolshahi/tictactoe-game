import React from "react";

export default function Square({ value, onSquareClick, className, theme, isAnimating }) {
  const squareStyles = {
    backgroundColor: theme.boardBg,
    borderColor: theme.boardBorder,
    "--x-color": theme.xColor,
    "--o-color": theme.oColor,
    "--hover-bg": theme.hoverBg,
    animation: isAnimating ? "pop 0.3s ease-out" : "none"
  };

  return (
    <button 
      className={className} 
      onClick={onSquareClick}
      style={squareStyles}
    >
      {value}
    </button>
  );
}