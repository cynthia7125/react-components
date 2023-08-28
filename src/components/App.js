import Header from "./Header";
import { createContext, useState } from "react";
import Speakers from "./Speakers";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <div
        className={
          theme === "light" ? "container-fluid light" : "constiner-fluid dark"
        }
      >
        <Header theme={theme} />
        <Speakers theme={theme} setTheme={setTheme} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
