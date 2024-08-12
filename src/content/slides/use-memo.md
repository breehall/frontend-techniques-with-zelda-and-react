## 1. What is `useMemo`?

`useMemo` is a hook that allows you to cache the **result** of a calculation between re-renders

### What is memoization?

Memoization is an optimization technique used to speed up calculations by storing the result of expensive function calls and returning the cached result when the same inputs occur again.

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## Use Cases

- Optimizing performance for heavy calculations (like filtering / sorting large arrays)

- Improving performance in large data tables

<hr />

## 2. Sorting feed posts without `useMemo`

**Expected Logs:**

- Force re-render button click
- `<Feed />` component render
- `getSortedPosts` render

```jsx
const getSortedPosts = (feedPosts, sort) => {
  console.log(`[NOT MEMO] running sort by ${sort}`);

  switch (sort) {
    case "Most Popular":
      return [...feedPosts].sort((a, b) => b.likes - a.likes);

    case "Most Comments":
      return [...feedPosts].sort((a, b) => b.comments - a.comments);

    case "Most Recent":
    default:
      return [...feedPosts].sort(
        (a, b) =>
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime(),
      );
  }
};

<hr />;

const sortedPosts = getSortedPosts(feedPosts, sort);
```

## 3. Sorting feed posts without `useMemo`

**Expected Logs:**

- Force re-render button click
- `<Feed />` component render
- `getSortedPosts` render

![Without useMemo](/feed_without_usememo.gif)

<hr />

## 4. Sorting feed posts with `useMemo`

**Expected Logs:**

- Force re-render button click
- `<Feed />` component render
- `getSortedPosts` render (on initial render, not forced update)

```jsx
const sortedPosts = useMemo(() => {
  console.log(`[WITH MEMO] running sort by ${sort}`);

  switch (sort) {
    case "Most Popular":
      return [...feedPosts].sort((a, b) => b.likes - a.likes);

    case "Most Comments":
      return [...feedPosts].sort((a, b) => b.comments - a.comments);
      break;
    case "Most Recent":
    default:
      return [...feedPosts].sort(
        (a, b) =>
          new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime(),
      );
  }
}, [feedPosts, sort]);
```

<hr />

## 5. Sorting feed posts with `useMemo`

**Expected Logs:**

- Force re-render button click
- `<Feed />` component render
- `getSortedPosts` render (on initial render, not forced update)

![Without useMemo](/feed_with_usememo.gif)
