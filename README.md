# React Tic Tac Toe Game

A modern, interactive implementation of the classic Tic Tac Toe game built with React.

## Features

- 🎮 Classic Tic Tac Toe gameplay
- 📜 Game history navigation
- ⏪ Time travel functionality to revisit previous moves
- 🎭 Smooth animations
- 🔄 Game restart option
- ⚡ Responsive design
- 🎲 Win and draw state detection

## Getting Started

### Prerequisites

- Node.js (version 14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-tic-tac-toe.git
   cd react-tic-tac-toe
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How to Play

1. The game starts with player X
2. Players take turns clicking on an empty square to place their mark (X or O)
3. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins
4. If all squares are filled and no player has won, the game ends in a draw
5. Use the game history list to jump back to any previous state of the game
6. Click "Restart Game" to start a new game at any time

## Project Structure

```
src/
├── App.js            # Main game component 
├── index.js          # Index component
├── styles.css        # Game styling
```

## Customization

### Adding Sounds

The game includes commented-out code for adding sound effects. To implement sounds:

1. Add audio files to an `src/` directory
2. Create a sound utility function:
   ```javascript
   function playSound(soundName) {
     const sound = new Audio(`/assets/sounds/${soundName}.mp3`);
     sound.play();
   }
   ```
3. Uncomment the playSound calls in the code

### Styling

The game uses CSS classes for styling. You can customize the appearance by modifying your CSS file:

- `.container` - Main game container
- `.game` - Game layout
- `.game-board` - Game board container
- `.board` - The 3x3 grid
- `.square` - Individual squares
- `.square.x` and `.square.o` - Styled X and O squares
- `.status` - Game status message
- `.winner` - Winner announcement styling
- `.game-info` - History panel
- `.restart-btn` - Restart button

## Future Enhancements

- Add sound effects
- Implement difficulty levels with AI opponents
- Add player statistics and score tracking
- Create multiplayer functionality
- Add customizable themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the React tutorial with modern enhancements
- Built with React Hooks