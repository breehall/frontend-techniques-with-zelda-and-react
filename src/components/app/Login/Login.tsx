import React, { useContext } from "react";
import { useTheme, ThemeProvider, ThemeContext } from "./ThemeContext";

/**
 * Using a theme context to toggle between light and dark modes
 * 1. Wrap the app / component with the ThemeProvider
 * 2. Use the useTheme hook to access the theme and toggle function OR useContext(ThemeContext) to access the context directly
 * 3. Use the theme and toggle function to conditionally style the component
 */

// 1 - Wrap the app / component with the ThemeProvider
const LoginComponent = () => {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
};

const Login = () => {
  // 2 - Use the useTheme hook to access the theme and toggle
  const { theme, toggleTheme } = useTheme();

  // 2 - OR Use useContext(ThemeContext) to access the context directly
  // const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  };

  // 3 - Use the theme to conditionally style the component
  const lightModeStyle = {
    backgroundGradient: "from-green-200 to-green-600",
    icon: "night",
    inputStyles: "bg-white border border-gray-300 rounded-lg shadow-sm p-3",
    loginButton: "bg-gray-800 text-white rounded-lg p-3 shadow-md",
  };

  const darkModeStyle = {
    backgroundGradient: "from-lime-800 to-lime-950",
    icon: "sun",
    inputStyles:
      "bg-gray-900 border border-gray-800 rounded-lg shadow-sm p-3 text-white",
    loginButton: "bg-lime-200 text-black rounded-lg p-3 shadow-md",
  };

  return (
    <div
      className={`relative flex flex-col justify-center items-center h-screen p-8 rounded-2xl bg-cover bg-center bg-gradient-to-br ${
        theme === "light"
          ? lightModeStyle.backgroundGradient
          : darkModeStyle.backgroundGradient
      }`}
    >
      <button
        onClick={() => toggleTheme()}
        className="absolute top-10 right-10 text-3xl text-green-950"
      >
        <i
          className={`lni lni-${
            theme === "light" ? lightModeStyle.icon : darkModeStyle.icon
          }`}
        ></i>
      </button>
      <form
        className="flex flex-col items-center w-2/3 h-full justify-center"
        onSubmit={handleSubmit}
      >
        <img src="/triforce.png" className="h-28 mb-10" />
        <div className="flex flex-col space-y-4 w-full">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={
              theme === "light"
                ? lightModeStyle.inputStyles
                : darkModeStyle.inputStyles
            }
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={
              theme === "light"
                ? lightModeStyle.inputStyles
                : darkModeStyle.inputStyles
            }
          />
        </div>
        <button
          type="submit"
          className={`mt-4 w-full rounded-lg p-3 shadow-md ${
            theme === "light"
              ? lightModeStyle.loginButton
              : darkModeStyle.loginButton
          }`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
