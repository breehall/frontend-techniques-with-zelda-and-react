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
