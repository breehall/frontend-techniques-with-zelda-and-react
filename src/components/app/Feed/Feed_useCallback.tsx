import { useState, useMemo, useCallback, memo } from "react";

import Post from "../Post";
import type { PostProps } from "../Post";

import { FEED_POSTS } from "../../../pages/api/posts";

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<PostProps[]>(FEED_POSTS);
  const [selectedButton, setSelectedButton] = useState("Most Recent");

  /**
   *
   *  See useCallback in action in the console of your browser. A few console logs have been placed around this component. Click the "heart" icon on a post to see the logs.
   *  1. Within the handleLikes (both with and without useCallback) functions
   *  2. Within the Feed component itself
   *  3. Within each Post component card
   *
   *  When using the handleLike function without useCallback, you will see that the function is called every time the component re-renders, resulting in a log being
   *  printed to the console for each post in the feed. This is because the function is re-created on each render, causing the Post component to re-render.
   *
   *  NOTE: When using the handleLike function with useCallback, use the MemoizedPost component instead of the Post component. This will prevent the Post component from
   *  re-rendering when the handleLike function is called.
   *  When using the handleLike function with useCallback, you will see that the function is only called when the postId is clicked. This is because the function is
   *  memoized and only re-created when the dependencies change. In this case, the function is only re-created when the feedPosts state changes.
   */

  const sortedPosts = useMemo(() => {
    switch (selectedButton) {
      case "Most Popular":
        return [...feedPosts].sort((a, b) => b.likes - a.likes);

      case "Most Comments":
        return [...feedPosts].sort((a, b) => b.comments - a.comments);
        break;
      case "Most Recent":
      default:
        return [...feedPosts].sort(
          (a, b) =>
            new Date(b.datePosted ?? 0).getTime() -
            new Date(a.datePosted ?? 0).getTime(),
        );
    }
  }, [feedPosts, selectedButton]);

  // <-- Get Sorted Posts without useCallback -->
  const handleLike = (postId: number) => {
    console.log("[NOT WITH CALLBACK] handleLike function called");
    setFeedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  // <-- Get Sorted Posts with useCallback -->
  // const handleLike = useCallback((postId: number) => {
  // console.log('[WITH CALLBACK] handleLike function called');
  //   setFeedPosts((prevPosts) =>
  //     prevPosts.map((post) =>
  //       post.postId === postId ? { ...post, likes: post.likes + 1 } : post,
  //     ),
  //   );
  // }, []);

  const handleFilterUpdate = useCallback((buttonName: string) => {
    setSelectedButton(buttonName);
  }, []);

  console.log("Feed Rendered");

  return (
    <section id="adventure-log" className="px-6 pb-4 rounded-2xl bg-slate-100">
      <FeedHeader />
      <div className="flex justify-end space-x-4 m-4">
        <FilterButton
          text="Most Recent"
          isSelected={selectedButton === "Most Recent"}
          onClick={() => handleFilterUpdate("Most Recent")}
        />
        <FilterButton
          text="Most Popular"
          isSelected={selectedButton === "Most Popular"}
          onClick={() => handleFilterUpdate("Most Popular")}
        />
        <FilterButton
          text="Most Comments"
          isSelected={selectedButton === "Most Comments"}
          onClick={() => handleFilterUpdate("Most Comments")}
        />
      </div>

      <div className="space-y-4">
        {sortedPosts.map((post) => (
          /** Use MemoizedPost instead of Post when using useCallback */
          // <MemoizedPost key={post.postId} onLike={handleLike} {...post} />
          <Post key={post.postId} onLike={handleLike} {...post} />
        ))}
      </div>
    </section>
  );
};

const MemoizedPost = memo(Post);

/** FEED COMPONENTS */
type FilterButtonProps = {
  text: string;
  isSelected: boolean;
  onClick: () => void;
};

const FeedHeader = () => {
  return (
    <div className="flex justify-between align-middle pt-8 pb-3 ">
      <img src="./triforce.png" alt="Triforce" className="w-8 h-8" />
      <h1 className="text-2xl">Feed</h1>
      <img
        src="https://assetsio.gnwcdn.com/tears-of-the-kingdom-selfie-1.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webpg"
        alt="Triforce"
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
};

const FilterButton = ({ text, isSelected, onClick }: FilterButtonProps) => {
  return (
    <button
      className={`text-gray-600 text-xs ${isSelected ? "font-bold" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Feed;
