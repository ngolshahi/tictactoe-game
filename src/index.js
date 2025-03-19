import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "./ThemeContext";
import Game from "./Game";

export default function App() {
  return (
    <ThemeProvider>
      <Game />
    </ThemeProvider>
  );
}