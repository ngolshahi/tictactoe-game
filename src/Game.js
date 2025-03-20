import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import AudioManager from "./AudioManager";
import ConfettiEffect from "./ConfettiEffect";
import { calculateWinner } from "./gameUtils";

export default function Game() {
  const { theme, currentTheme, themeOptions, setTheme } = useTheme();
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  const [boardSize, setBoardSize] = useState(3);
  const [gameMode, setGameMode] = useState("standard"); // standard, timeAttack, powerUp
  const [playerNames, setPlayerNames] = useState({ X: "Player X", O: "Player O" });
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [achievements, setAchievements] = useState({
    firstWin: { X: false, O: false },
    threeWins: { X: false, O: false },
    fiveWins: { X: false, O: false },
    quickWin: false,
    comeback: false
  });
  
  const audioManager = useRef(new AudioManager());
  const timerRef = useRef(null);
  
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const currentPlayer = xIsNext ? "X" : "O";
  
  const winner = calculateWinner(currentSquares, boardSize);
  const gameIsDraw = !winner && currentSquares.every(square => square !== null);

  // Handle time attack mode
  useEffect(() => {
    if (gameMode === "timeAttack" && !winner && !gameIsDraw) {
      if (isTimerActive) {
        timerRef.current = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timerRef.current);
              // Auto-play a random valid move
              autoPlayMove();
              return 10; // Reset timer
            }
            return prevTime - 1;
          });
        }, 1000);
      }
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, gameMode, winner, gameIsDraw]);

  // Begin timer on first move
  useEffect(() => {
    if (currentMove > 0 && gameMode === "timeAttack") {
      setIsTimerActive(true);
    }
  }, [currentMove, gameMode]);

  // Sound effects
  useEffect(() => {
    if (winner) {
      audioManager.current.play("win");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      
      // Update scores
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
      
      // Check for achievements
      checkAchievements(winner);
    } else if (gameIsDraw) {
      audioManager.current.play("draw");
      setScores(prev => ({
        ...prev,
        draw: prev.draw + 1
      }));
    }
  }, [winner, gameIsDraw]);

  function autoPlayMove() {
    const emptySquares = currentSquares.map((square, i) => 
      square === null ? i : null).filter(i => i !== null);
    
    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const nextSquares = currentSquares.slice();
      nextSquares[emptySquares[randomIndex]] = xIsNext ? "X" : "O";
      handlePlay(nextSquares);
    }
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    // Reset timer for time attack mode
    if (gameMode === "timeAttack") {
      setTimeLeft(10);
    }

    audioManager.current.play("move");
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    audioManager.current.play("jump");
  }

  function handleRestart() {
    setHistory([Array(boardSize * boardSize).fill(null)]);
    setCurrentMove(0);
    setIsTimerActive(false);
    setTimeLeft(10);
    audioManager.current.play("restart");
  }

  function handleBoardSizeChange(size) {
    setBoardSize(size);
    setHistory([Array(size * size).fill(null)]);
    setCurrentMove(0);
    setIsTimerActive(false);
    setTimeLeft(10);
  }
  
  function handleGameModeChange(mode) {
    setGameMode(mode);
    handleRestart();
  }
  
  function handleNameChange(player, name) {
    setPlayerNames(prev => ({
      ...prev,
      [player]: name
    }));
  }
  
  function checkAchievements(winner) {
    const newAchievements = {...achievements};
    
    // First win
    if (!achievements.firstWin[winner]) {
      newAchievements.firstWin[winner] = true;
      showAchievementNotification(`${playerNames[winner]} won their first game!`);
    }
    
    // Three wins
    if (scores[winner] + 1 >= 3 && !achievements.threeWins[winner]) {
      newAchievements.threeWins[winner] = true;
      showAchievementNotification(`${playerNames[winner]} reached 3 wins!`);
    }
    
    // Five wins
    if (scores[winner] + 1 >= 5 && !achievements.fiveWins[winner]) {
      newAchievements.fiveWins[winner] = true;
      showAchievementNotification(`${playerNames[winner]} reached 5 wins!`);
    }
    
    // Quick win (in 5 moves or less)
    if (currentMove <= 8 && !achievements.quickWin) {
      newAchievements.quickWin = true;
      showAchievementNotification("Quick win achievement unlocked!");
    }
    
    setAchievements(newAchievements);
  }
  
  function showAchievementNotification(message) {
    // This would be implemented with a notification system
    console.log("Achievement unlocked:", message);
    // For simplicity, we'll use an alert, but in a real app you'd use a toast or notification
    alert(`🏆 ACHIEVEMENT UNLOCKED: ${message}`);
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
          className={`history-btn ${isCurrent ? "current" : ""}`}
          onClick={() => jumpTo(move)}
          style={{
            backgroundColor: isCurrent ? theme.boardBorder : "transparent",
            color: isCurrent ? "#fff" : theme.textColor
          }}
        >
          {description}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${playerNames[winner]}`;
  } else if (gameIsDraw) {
    status = "Game ended in a draw!";
  } else {
    status = `Next Player: ${playerNames[currentPlayer]}`;
  }

  return (
    <div className="container" style={{ color: theme.textColor }}>
      <h1 className="game-title">Tic Tac Toe Deluxe</h1>

      <div className="game-options">
        <div className="option-group">
          <label htmlFor="theme-select">Theme:</label>
          <select
            id="theme-select"
            value={currentTheme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ backgroundColor: theme.boardBg, color: theme.textColor }}
          >
            {themeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="option-group">
          <label htmlFor="board-size">Board Size:</label>
          <select
            id="board-size"
            value={boardSize}
            onChange={(e) => handleBoardSizeChange(parseInt(e.target.value))}
            style={{ backgroundColor: theme.boardBg, color: theme.textColor }}
          >
            <option value={3}>3×3</option>
            <option value={4}>4×4</option>
            <option value={5}>5×5</option>
          </select>
        </div>
        <div className="option-group">
          <label htmlFor="game-mode">Game Mode:</label>
          <select
            id="game-mode"
            value={gameMode}
            onChange={(e) => handleGameModeChange(e.target.value)}
            style={{ backgroundColor: theme.boardBg, color: theme.textColor }}
          >
            <option value="standard">Standard</option>
            <option value="timeAttack">Time Attack</option>
          </select>
        </div>
      </div>

      <div className="player-names">
        <div className="player-input">
          <label htmlFor="player-x">Player X:</label>
          <input
            id="player-x"
            type="text"
            value={playerNames.X}
            onChange={(e) => handleNameChange("X", e.target.value)}
            style={{ backgroundColor: theme.boardBg, color: theme.xColor }}
          />
        </div>
        <div className="player-input">
          <label htmlFor="player-o">Player O:</label>
          <input
            id="player-o"
            type="text"
            value={playerNames.O}
            onChange={(e) => handleNameChange("O", e.target.value)}
            style={{ backgroundColor: theme.boardBg, color: theme.oColor }}
          />
        </div>
      </div>

      {gameMode === "timeAttack" && (
        <div
          className="timer"
          style={{ color: timeLeft <= 3 ? theme.xColor : theme.textColor }}
        >
          Time Left: {timeLeft}s
        </div>
      )}

      <div className="game">
        <div className="game-board">
          <div
            className={`status ${winner ? "winner" : ""}`}
            style={{
              color: winner ? theme.winColor : theme.textColor,
            }}
          >
            {status}
          </div>

          <div className="board-container">
            <Board
              size={boardSize}
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              isAnimating={isAnimating}
              gameOver={!!winner || gameIsDraw}
              theme={theme}
            />
          </div>

          <button
            className="restart-btn"
            onClick={handleRestart}
            style={{ backgroundColor: theme.boardBorder, color: "#fff" }}
          >
            Restart Game
          </button>
        </div>

        <div className="game-info" style={{ backgroundColor: theme.boardBg }}>
          <h2>Game History</h2>
          <ol>{moves}</ol>
        </div>
      </div>

      <ScoreBoard scores={scores} playerNames={playerNames} theme={theme} />

      {showConfetti && <ConfettiEffect />}
    </div>
  );
}