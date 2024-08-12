## 1. What is `useContext`?

`useContext` is a hook that allows you to access context values across components without introducing nesting

```tsx
const theme = useContext(ThemeContext);
```

## Use Cases

`useContext` is useful in scenarios where data needs to be accessed globally or through many levels of components. It helps to prevent prop drilling.

**Examples:**

- Sharing state across multiple components
- Managing global state (like themes or authentication)
- Global settings or configuration

## Key Terms

**Provider:** The `provider` component supplies the context value to add components within its subtree

**Consumer:** The `consumer` component, or `useContext` hook allows you to access the context value

```jsx
// ThemeContext.tsx
const ThemeContext = React.createContext("light");
```

```jsx
// App.tsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

```jsx
// Any component in the <App> subtree
const theme = useContext(ThemeContext);
```

<hr />

## Creating a Theme Context

### 1. Creating the context

Use `createContext` to define the new context. The context doesn't hold any information. It represents which contexts other components read or provide.

```jsx
// ThemeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const defaultContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);
```

### 2. Creating a provider component

Create a provider component to provide the theme context to its children and manage the theme state.

```jsx
// ThemeContext.tsx

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 3. Creating a custom hook for the context

Creating a custom hook isn't required, but it provides a few benefits:

- Encapsulation and abstraction of context logic
- Error handling
- Promotes consistency when accessing the context throughout the app

```jsx
// ThemeContext.tsx

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
```

### 4. Wrap the app with the provider

```jsx
import App from "./App";
import { ThemeProvider } from "./ThemeContext";
return (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

### 5. Consume the Context

```jsx
// Using the custom theme context hook
import { useThemeContext } from "./ThemeContext";
const Login = () => {
  const { theme, toggleTheme } = useTheme();
  // ...
};

// Using the `useContext` hook directly
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
const Login = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // ...
};
```

### 6. Applying themes

```jsx
// Login.tsx
<div>
  <button className={theme === "light" ? "moon" : "sun"}></button>
  <form>
    <input
      type="text"
      name="username"
      placeholder="Username"
      className={theme === "light" ? "lightModeStyles" : "darkModeStyles"}
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      className={theme === "light" ? "lightModeStyles" : "darkModeStyles"}
    />
    // ...
  </form>
</div>
```

<hr />

## 3. More advanced uses cases for React context:

- Switching between multiple themes (think Slack themes or VS Code themes)
- Authentication and authorization
- Internationalization
- Centralized error handling and reporting
- Complex multi-step form state management
