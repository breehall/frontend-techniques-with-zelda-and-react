import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Creating a theme context to toggle between light and dark modes
 * 1. Create the context with a default value
 * 2. Create a provider component that will wrap the app
 *    2.1 Expose a toggle function to change the theme
 * 3. Create a custom hook to expose the context
 */

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const defaultContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
};

// 1 - Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>(defaultContext);

interface ThemeProviderProps {
  children: ReactNode;
}

// 2 - Create a provider component that will wrap the app
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 2.1 - Expose a toggle function to change the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3 - Create a custom hook to expose the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
