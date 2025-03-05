import { useState, useEffect } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const winner = calculateWinner(currentSquares);
  const gameIsDraw =
    !winner && currentSquares.every((square) => square !== null);

  useEffect(() => {
    // This would be implemented in a full app with audio files
    if (winner || gameIsDraw) {
      // playSound("game-over");
    }
  }, [winner, gameIsDraw]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // Would play move sound here in a full implementation
    // playSound("move");
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // Would play jump sound here in a full implementation
    // playSound("jump");
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);

    // Would play restart sound here in a full implementation
    // playSound("restart");
  }

  const moves = history.map((squares, move) => {
    const isCurrent = move === currentMove;
    let description;
    if (move > 0) {
      description = `Move #${move}`;
    } else {
      description = "Game start";
    }
    return (
      <li key={move}>
        <button
          className={isCurrent ? "current" : ""}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (gameIsDraw) {
    status = "Game ended in a draw!";
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game-board">
          <div className={`status ${winner ? "winner" : ""}`}>{status}</div>
          <div className="board-container">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              isAnimating={isAnimating}
              gameOver={!!winner || gameIsDraw}
            />
          </div>
          <button className="restart-btn" onClick={handleRestart}>
            Restart Game
          </button>
        </div>
        <div className="game-info">
          <h2>Game History</h2>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay, isAnimating, gameOver }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || isAnimating || gameOver) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  // Create the board using a more modern approach
  const renderSquare = (i) => {
    const value = squares[i];
    const squareClass = `square ${value?.toLowerCase() || ""}`;

    return (
      <Square
        key={i}
        value={value}
        onSquareClick={() => handleClick(i)}
        className={squareClass}
      />
    );
  };

  const boardSquares = [];
  for (let i = 0; i < 9; i++) {
    boardSquares.push(renderSquare(i));
  }

  return <div className="board">{boardSquares}</div>;
}

function Square({ value, onSquareClick, className }) {
  // The square no longer directly contains the text content
  // CSS ::after pseudo-elements will display X and O
  return (
    <button className={className} onClick={onSquareClick}>
      {/* Intentionally empty - text shown via CSS */}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
