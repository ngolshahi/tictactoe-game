export function calculateWinner(squares, size = 3) {
    // Generate all possible winning combinations for any board size
    const lines = [];
    
    // Rows
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(i * size + j);
      }
      lines.push(row);
    }
    
    // Columns
    for (let i = 0; i < size; i++) {
      const col = [];
      for (let j = 0; j < size; j++) {
        col.push(j * size + i);
      }
      lines.push(col);
    }
    
    // Diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
      diag1.push(i * size + i);
      diag2.push(i * size + (size - 1 - i));
    }
    lines.push(diag1);
    lines.push(diag2);
    
    // Check for winner
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const firstSquare = squares[line[0]];
      if (!firstSquare) continue;
      
      let isWinning = true;
      for (let j = 1; j < line.length; j++) {
        if (squares[line[j]] !== firstSquare) {
          isWinning = false;
          break;
        }
      }
      
      if (isWinning) {
        return firstSquare;
      }
    }
    
    return null;
  }