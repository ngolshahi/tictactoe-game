import React from "react";

export default function ScoreBoard({ scores, playerNames, theme }) {
  return (
    <div className="score-board" style={{ backgroundColor: theme.boardBg }}>
      <h2>Score Board</h2>
      <div className="scores">
        <div className="score-item" style={{ color: theme.xColor }}>
          <span className="player-name">{playerNames.X}</span>
          <span className="score-value">{scores.X}</span>
        </div>
        <div className="score-item" style={{ color: theme.oColor }}>
          <span className="player-name">{playerNames.O}</span>
          <span className="score-value">{scores.O}</span>
        </div>
        <div className="score-item">
          <span className="player-name">Draws</span>
          <span className="score-value">{scores.draw}</span>
        </div>
      </div>
    </div>
  );
}