## 1. What is `useReducer`?

`useReducer` is a hook that is used for managing complex state logic within your React components

```jsx
const logReducer = (state, action) => {
  // reducer logic
};

const AdventureLog = () => {
  const [state, dispatch] = useReducer(logReducer, initialState);

  // ...
};
```

## Use Cases

Complex logic state with multiple variables, sub-values, or when the next state depends on the previous state.

**Examples:**

- State transitions based on actions (like validation)

- Multi-step work flows

- Managing component states (like tabs or accordions)

<hr/>

## 2. Configuring the reducer

**Accepts**:

- A reducer function that determines how the state gets updated
- An initial value for the state
- [Optional] An initializer function that will return the initial state value

**Returns**:

- The state
- A `dispatch` function to update the state

```jsx
// AdventureLog.tsx
const AdventureLog = () => {
  const initialState = {
    logEntries: [],
    logEntryTypes: {
      item: 0,
      enemy: 0,
      quest: 0,
    },
    items: [],
    enemies: [],
    quests: [],
  };

  const [state, dispatch] = useReducer(logReducer, initialState);
};
```

<hr/>

## 3. The Reducer Function

The reducer function handles state transitions. It accepts the current state and action (`type`) and returns the new state.

```jsx
// AdventureLog.tsx
const logReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LOG":
      return {
        ...state,
        logEntryTypes: {
          ...state.logEntryTypes,
          ...action.payload.logEntryTypes,
        },
        logEntries: [...state.logEntries, action.payload],
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "ADD_ENEMY":
      return {
        ...state,
        enemies: [...state.enemies, action.payload],
      };
    case "ADD_QUEST":
      return {
        ...state,
        quests: [...state.quests, action.payload],
      };
    default:
      throw new Error("Unknown action type");
  }
};
```

<hr />

## 4. Setting Up the Log Adventure Log Submission Form

```jsx
// AdventureLog.tsx
const AdventureLog = () => {
  // .. Reducer logic

  const handleSubmit = (event) => {
    // ... logic to get form data

    switch (logType) {
      case "item":
        addItem(logEntry);
        break;
      // ... additional cases for enemy and quest
    }
  };

  return (
    <form>
      <select name="logType">
        // select options for item, enemy, and quest
      </select>
      <input type="text" name="logEntry" />
      <button type="submit" onClick={handleSumbit}>
        Add Adventure Log
      </button>
    </form>
  );
};
```

<hr />

## 5. Dispatching Actions

```jsx
// AdventureLog.tsx
const AdventureLog = () => {
  // ...
  // Add a new item to the the `items` array in state
  const addItem = (item) => ({
    type: "ADD_ITEM",
    payload: item,
  });
  // Add new log entry and increment `logEntryTypes[item]` in state
  const addLog = (logEntry, logType) => ({
    type: "ADD_LOG",
    payload: {
      logEntry,
      logType,
      logEntryTypes: {
        [logType]: state.logEntryTypes[logType] + 1,
      },
    },
  });
  // Dispatch state updates
  const handleAddItem = (newItem) => {
    dispatch(addItem(newItem));
    dispatch(addLog(`Collected item: ${newItem}`, "item"));
  };
  // ...
};
```
