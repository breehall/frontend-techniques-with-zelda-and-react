import { useState, lazy, Suspense, type ComponentType } from "react";

import { FEED_POST_COMMENTS } from "../../pages/api/posts";

export type PostProps = {
  postId: number;
  username: string;
  name: string;
  avatar: string;
  age?: string;
  datePosted?: string;
  content: string;
  likes: number;
  comments: number;
  saves: number;
  onLike?: (postId: number) => void;
};

const Post = ({
  postId,
  username,
  name,
  avatar,
  age,
  datePosted,
  content,
  likes,
  comments,
  saves,
  onLike,
}: PostProps) => {
  console.log(`Post ${postId} Rendered`);

  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(FEED_POST_COMMENTS);

  // Show and hide comments on click
  const handleCommentsClick = () => {
    setShowComments(!showComments);
  };

  // Lazy load the comments component with an artificial delay
  const lazyWithDelay = (
    importFunc: any,
    delay: number,
  ): Promise<{ default: ComponentType<any> }> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(importFunc()), delay);
    });
  };

  // Lazy load the comments component
  const PostComment = lazy(() =>
    lazyWithDelay(() => import("./Comment"), 2000),
  );

  const Loading = () => (
    <div>
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <article
      id={`post-${postId}`}
      className="flex flex-col p-4 pb-4 mb-3 border-2 text-sm border-stone-100 rounded-xl gap-4 bg-white shadow-sm"
    >
      <PostHeader
        name={name}
        username={username}
        age={age}
        datePosted={datePosted}
        avatar={avatar}
        content={content}
      />

      <div className="flex justify-around">
        <PostInteractionButton
          icon="heart"
          count={likes}
          label={`Like post with ${likes} likes`}
          postId={postId}
          onClick={() => onLike && onLike(postId)}
        />
        <PostInteractionButton
          icon="comments"
          count={saves}
          label={`Comment on post with ${comments} comments`}
          postId={postId}
          onClick={handleCommentsClick}
        />
        <PostInteractionButton
          icon="bookmark"
          count={saves}
          label={`Save post with ${saves} saves`}
          postId={postId}
        />
      </div>

      {/* 
        Lazy load the comments component with an artificial delay
        and show the loading component with the Suspense component
        while the comments are loading
       */}
      {showComments && (
        <Suspense fallback={<Loading />}>
          {commentList.map((comment) => (
            <PostComment
              key={comment.commentId}
              commentId={comment.commentId}
              username={comment.username}
              avatar={comment.avatar}
              name={comment.name}
              datePosted={comment.datePosted}
              content={comment.content}
            />
          ))}
          {commentList.length < comments && (
            <button className="p-3 w-full text-gray-500">
              See more comments
            </button>
          )}
        </Suspense>
      )}
    </article>
  );
};

/** POST COMPONENTS  */
const PostHeader = ({
  name,
  username,
  avatar,
  age,
  datePosted,
  content,
}: Partial<PostProps>) => {
  return (
    <div className="flex flex-row gap-x-4 ">
      <img
        src={avatar}
        alt={`${name}'s profile picture`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="font-bold">
          {name} <span className="font-normal">@{username}</span> ·{" "}
          {age && <span className="font-normal">{age}</span>}
          {datePosted && <span className="font-normal">{datePosted}</span>}
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
};

type PostInteractionButtonProps = {
  icon: string;
  count: number;
  label: string;
  postId: number;
  onClick?: () => void;
};

const PostInteractionButton = ({
  icon,
  count,
  label,
  postId,
  onClick,
}: PostInteractionButtonProps) => {
  return (
    <button
      className="text-stone-400 flex items-center justify-center gap-2"
      aria-label={label}
      key={`post-interaction-${icon}-${postId}`}
      onClick={onClick}
    >
      <i className={`lni lni-${icon}`}></i> {count}
    </button>
  );
};

export default Post;
