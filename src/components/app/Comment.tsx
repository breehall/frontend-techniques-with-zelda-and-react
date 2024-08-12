import type { PostProps } from "./Post";

export type CommentProps = Pick<
  PostProps,
  "postId" | "username" | "avatar" | "name" | "datePosted" | "content"
> & {
  commentId: number;
};

const PostComment = ({
  commentId,
  username,
  avatar,
  name,
  datePosted,
  content,
}: CommentProps) => {
  return (
    <article
      id={`post-${commentId}`}
      key={commentId}
      className="p-4 border bg-white shadow-sm rounded-lg space-y-4"
    >
      <div className="flex items-start space-x-4">
        <img
          src={avatar}
          alt="Profile Image"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-bold">
            {name}
            <span className="font-normal text-gray-600">
              {" "}
              @{username}
            </span> ·{" "}
            <span className="font-normal text-gray-600">{datePosted}</span>
          </p>
          <p>{content}</p>
        </div>
      </div>
    </article>
  );
};

export default PostComment;
