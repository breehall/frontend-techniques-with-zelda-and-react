## 1. What is `useCallback`?

`useCallback` is a hook for caching a **function definition** between re-renders by returning a memoized callback

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## Use Cases

- Optimizing performance with memoized child components
- Avoiding unnecessary re-renders
- Memoizing event handlers

<hr />

## 2. Handling likes without `useCallback`

```jsx
// Feed.tsx
const Feed = () => {
  // Update like count
  const handleLike = (postId: number) => {
    console.log('handleLike function called');
        setFeedPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.postId === postId ? { ...post, likes: post.likes + 1 } : post
            )
        );
  };
}
```

<hr />

## 3. Handling likes without `useCallback`

**Expected Logs:**

- `handleLike` function called
- `<Feed />` component render
- Render notifications for each post in the feed

![Without useCallback](/feed_without_usecallback.gif)

<hr />

## 4. Handling likes with `useCallback`

**Expected Logs:**

- `handleLike` function called
- `<Feed />` component render
- Render notifications ONLY for the post we interact with

```jsx
// Feed.tsx
const Feed = () => {
  // Update like count with `useCallback`
  const handleLike = useCallback((postId: number) => {
    console.log('handleLike function called');
    setFeedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }, []);
}
```

<hr />

## 5. Handling likes without `useCallback`

![Without useCallback](/feed_with_usecallback.gif)

<hr />

## 6. Memoizing the `Feed` component

`memo` allows you to skip re-rendering a component when the props haven't changed

```jsx
// Post.tsx
const Post = () => {
  // Feed post component
};

const MemoizedPost = memo(Post);
```

```jsx
// Post.tsx
const Feed = () => {
    // Feed component
    return (
        {posts.map((post) => (
          <MemoizedPost
            // ...
          />
        ))}
    )
}
```
