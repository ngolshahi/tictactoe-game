import { createContext, useState, useContext, useEffect } from "react";

// Define theme options
const themes = {
  classic: {
    name: "Classic",
    boardBg: "#f0f0f0",
    boardBorder: "#333",
    xColor: "#e74c3c",
    oColor: "#3498db",
    winColor: "#2ecc71",
    hoverBg: "#e8e8e8",
    textColor: "#333",
    bgColor: "#fff",
  },
  dark: {
    name: "Dark Mode",
    boardBg: "#2c3e50",
    boardBorder: "#34495e",
    xColor: "#e74c3c",
    oColor: "#3498db",
    winColor: "#2ecc71",
    hoverBg: "#34495e",
    textColor: "#ecf0f1",
    bgColor: "#1a1a1a",
  },
  neon: {
    name: "Neon",
    boardBg: "#111",
    boardBorder: "#0ff",
    xColor: "#f0f",
    oColor: "#0ff",
    winColor: "#0f0",
    hoverBg: "#222",
    textColor: "#fff",
    bgColor: "#000",
  },
  nature: {
    name: "Nature",
    boardBg: "#d9c7a9",
    boardBorder: "#5d4037",
    xColor: "#795548",
    oColor: "#4caf50",
    winColor: "#ff9800",
    hoverBg: "#e5d3b3",
    textColor: "#3e2723",
    bgColor: "#e8f5e9",
  }
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("classic");
  
  // Apply theme to body
  useEffect(() => {
    document.body.style.backgroundColor = themes[currentTheme].bgColor;
    document.body.style.color = themes[currentTheme].textColor;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme: themes[currentTheme], 
      themeOptions: Object.keys(themes).map(key => ({ value: key, label: themes[key].name })),
      setTheme: setCurrentTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}