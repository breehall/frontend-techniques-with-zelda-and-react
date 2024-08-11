---
layout: ../layouts/MarkdownLayout.astro
# nextPageLink: use-reducer.md
# nextPageTitle: useReducer
# title: Astro in brief
# author: Himanshu
# description: Find out what makes Astro awesome!
---

## What is `useState`?

`useState` is the hook that allows you to manage local state within your React components

```tsx
const [count, setCount] = useState(0);
```

<hr/>

## Use Cases

**Simple** state management where the state is **independent** and doesn’t involve complex logic or multiple values that need to be updated together.

**Examples:**

- Simple form input handling
- Toggling UI elements (like modals or dropdowns)
- Tracking user interactions (like click or hover)
- Storing small, local state values


## Maintaining simple, local state

### Creating a basic counter with `useState`

- Accepts: the default value for the state
- Returns: the state and set function to update the state

```tsx
// TriforceTap.tsx

import React, { useState } from 'react';

const TriforceTap = () => {
  const [totalTriforceTaps, setTotalTriforceTaps] = useState(0);
  const [allowSelfTap, setAllowSelfTap] = useState(true);

  const handleTap = () => {
    setTotalTriforceTaps(totalTriforceTaps + 1);
    setAllowSelfTap(false);
  };

  return (
    <div>
      <p>{totalTriforceTaps}</p>
      <button onClick={handleTap} disabled={!allowSelfTap}> Tap </button>
    </div>
  );
};
```


## Update state based on the previous state

### Pass a function that will calculate the next state from the pending state

```tsx
// TriforceTap.tsx

import React, { useState } from 'react';

const TriforceTap = () => {
  const [totalTriforceTaps, setTotalTriforceTaps] = useState(0);
  const [allowSelfTap, setAllowSelfTap] = useState(true);

  const handleTap = () => {
    setTotalTriforceTaps((prevTaps) => prevTaps + 1); // 👈🏾
    setAllowSelfTap(false);
  };

  return (
    <div>
      <p>{totalTriforceTaps}</p>
      <button onClick={handleTap} disabled={!allowSelfTap}>
        Tap
      </button>
    </div>
  );
};
```

## Updating multiple pieces of state together

### Grouping related pieces of state into one state object

```jsx
// TriforceTap.tsx

// ❌ Instead of having three pieces of state

const [totalTriforceTaps, setTotalTriforceTaps] = useState(0);
const [allowSelfTap, setAllowSelfTap] = useState(true);
const [coolDown, setCoolDown] = useState(0);

// ✅ Create one state object for multiple pieces of related state

const coolDownPeriod = 5; //in seconds

const [state, setState] = useState({
  totalTriforceTaps: 0,
  allowSelfTap: true,
  coolDown: 0,
});
```

## Updating multiple pieces of state together

### Setting state for the new state object

```jsx
// TriforceTap.tsx

const coolDownPeriod = 5; //in seconds

// Updating the state when the tap button is clicked
const handleTap = () => {
  setState((prevState) => ({
    ...prevState,
    totalTriforceTaps: prevState.totalTriforceTaps + 1,
    allowSelfTap: false,
    coolDown: coolDownPeriod,
  }));
};
```

## Updating multiple pieces of state together

### Using `useEffect` to create a cool down timer

```jsx
// Defines the count down timer and updates the button state when the cool down period is over

useEffect(() => {
  let timer;
  if (state.coolDown > 0) {
    timer = setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        coolDown: prevState.coolDown - 1,
        allowSelfTap: prevState.coolDown - 1 <= 0,
      }));
    }, 1000);
  }
  return () => clearInterval(timer);
}, [state.coolDown]);
```



## 🛑 Don't use `useState` if:
- eif
- hello
- Managing global state
- Noticing frequent updates / re-renders and those are causing performance issues
- Reusing the same state logic across multiple components
- State is dependent on many fields or sub-fields




