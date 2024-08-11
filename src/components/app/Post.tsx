export type PostProps = {
  postId: number;
  username: string;
  name: string;
  avatar: string;
  age: string;
  content: string;
  likes: number;
  comments: number;
  saves: number;
};

const Post = ({
  postId,
  username,
  name,
  avatar,
  age,
  content,
  likes,
  comments,
  saves,
}: PostProps) => {
  return (
    <article
      id={`post-${postId}`}
      className="flex flex-col p-4 pb-4 mb-3 border-2 border-stone-100 rounded-xl gap-4"
    >
      <PostHeader
        name={name}
        username={username}
        age={age}
        avatar={avatar}
        content={content}
      />

      <div className="flex justify-around">
        <PostInteractionButton
          icon="heart"
          count={likes}
          label={`Like post with ${likes} likes`}
          postId={postId}
        />
        <PostInteractionButton
          icon="comments"
          count={saves}
          label={`Comment on post with ${comments} comments`}
          postId={postId}
        />
        <PostInteractionButton
          icon="bookmark"
          count={saves}
          label={`Save post with ${saves} saves`}
          postId={postId}
        />
      </div>
    </article>
  );
};

/** POST COMPONENTS  */
const PostHeader = ({
  name,
  username,
  avatar,
  age,
  content,
}: Partial<PostProps>) => {
  return (
    <div className="flex flex-row gap-x-4">
      <img
        src={avatar}
        alt={`${name}'s profile picture`}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-bold">
          {name} <span className="font-normal">@{username}</span> ·{" "}
          <span className="font-normal">{age}</span>
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
};

const PostInteractionButton = ({
  icon,
  count,
  label,
  postId,
}: PostInteractionButtonProps) => {
  return (
    <button
      className="text-stone-400 flex items-center justify-center gap-2"
      aria-label={label}
      key={`post-interaction-${icon}-${postId}`}
    >
      <i className={`lni lni-${icon}`}></i> {count}
    </button>
  );
};

export default Post;
