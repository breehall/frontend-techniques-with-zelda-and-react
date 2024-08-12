import { useState, useMemo, useCallback, memo } from "react";

import Post from "../Post";
import type { PostProps } from "../Post";

import { FEED_POSTS } from "../../../pages/api/posts";

const Feed = () => {
  const [feedPosts, setFeedPosts] = useState<PostProps[]>(FEED_POSTS);
  const [selectedButton, setSelectedButton] = useState("Most Comments");
  const [_, forceUpdate] = useState(0); // State variable to trigger re-renders

  /**
   *
   *  See useMemo in action in the console of your browser. A few console logs have been placed around this component.
   *  1. Within the getSortedPosts function and the sortedPosts useMemo example
   *  2. Within the Feed component itself
   *  3. Within force re-render button
   *
   *  When using the getSortedPosts function without useMemo, you will see that the function is called every time the component re-renders, resulting in all
   *  three logs being printed to the console.
   *
   *  When using the getSortedPosts function with useMemo, you will see that the function is only called when the feedPosts or selectedButton state changes. On the initial
   *  render, this results in all three logs being printed to the console. After that, only the log within the Feed component and the force re-render button will be printed.
   */

  // <-- Get Sorted Posts without useMemo -->
  const getSortedPosts = (feedPosts: PostProps[], selectedButton: string) => {
    console.log(`[NOT MEMO] running sort by ${selectedButton}`);

    switch (selectedButton) {
      case "Most Popular":
        return [...feedPosts].sort((a, b) => b.likes - a.likes);

      case "Most Comments":
        return [...feedPosts].sort((a, b) => b.comments - a.comments);

      case "Most Recent":
      default:
        return [...feedPosts].sort(
          (a, b) =>
            new Date(b.datePosted ?? 0).getTime() -
            new Date(a.datePosted ?? 0).getTime(),
        );
    }
  };

  const sortedPosts = getSortedPosts(feedPosts, selectedButton);

  // <-- Get Sorted Posts with useMemo -->
  // const sortedPosts = useMemo(() => {
  //   console.log(`[WITH MEMO] running sort by ${selectedButton}`);

  //   switch (selectedButton) {
  //     case "Most Popular":
  //       return [...feedPosts].sort((a, b) => b.likes - a.likes);

  //     case "Most Comments":
  //       return [...feedPosts].sort((a, b) => b.comments - a.comments);
  //       break;
  //     case "Most Recent":
  //     default:
  //       return [...feedPosts].sort(
  //         (a, b) =>
  //           new Date(b.datePosted ?? 0).getTime() - new Date(a.datePosted ?? 0).getTime(),
  //       );
  //   }
  // }, [feedPosts, selectedButton]);

  const handleLike = useCallback((postId: number) => {
    setFeedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  }, []);

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

        {/* Force a re-render of the component and view output in console */}
        <button
          className="bg-gray-400 text-white px-4 rounded text-xs"
          onClick={() => {
            console.log("[FORCED] Forced re-render with button click");
            forceUpdate((prev) => prev + 1);
          }}
        >
          Force re-render
        </button>
      </div>

      <div className="space-y-4">
        {sortedPosts.map((post) => (
          // <MemoizedPost key={post.postId} onLike={handleLike} {...post} />
          <Post key={post.postId} onLike={handleLike} {...post} />
        ))}
      </div>
    </section>
  );
};

// const MemoizedPost = memo(Post);

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
