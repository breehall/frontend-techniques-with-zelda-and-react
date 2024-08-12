## 1. What is Code Splitting ?

Instead of loading an entire app at once, code splitting allows parts of the app to be loaded on demand.

**Benefits:**

- ✅ Improves performance
- ✅ Lowers initial load time

<hr />

## 2. Lazy loading components in React

`lazy` is used to enabled code splitting at the component level

- Returns the component you want to render
- If the component is still loading when it's called to render, it will suspend and the `<Suspense>` component can be used to show a loading indicator

```jsx
const LazyComponent = React.lazy(() => import("./Component"));
```

<hr />

## 3. The `Suspense` component

When lazy loading a component, wrap it in `<Suspense>` to define a UI fallback that will be displayed while the component is loading.

```jsx
// lazy load PostComment component until the request to view comments

const PostComments = lazy(() => import('./PostComment'))

const Post = () => {
  return(
    // ...
      {showComments && (
        <Suspense fallback={<Loading />}>
          {commentList.map((comment) => (
            <PostComment props={props} />
          ))}
        </Suspense>
      )}
    // ...
  )
}
```

<hr />

## 4. Use cases for `lazy` and `<Suspense>`

- Lazy loading large or rarely used components
- Loading route based component in a single page app
- Delaying the load time of heavy libraries
- Reducing initial load time of the application

<hr />

## 5. A few caveats

⚠️ `<Suspense>` does not detect when data is being fetched inside of an effect or event handler

⚠️ Only suspense-enabled data sources will activate the `<Suspense>` component. These include:

- Data fetching with suspense-enabled frameworks like Next and Remix
- Loading components with lazy()
- Reading the value of a promise with use
