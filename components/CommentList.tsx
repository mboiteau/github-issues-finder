import { Comment } from "@/graphql/generated";
import AvatarProfile from "./AvatarProfile";

interface CommentListProps {
  comments?: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-sm rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Comments</h1>
      {comments?.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {comments?.map((comment) => (
            <li key={comment.id} className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AvatarProfile imageUrl={comment.author?.avatarUrl} size={32} />
                <span className="font-semibold">{comment.author?.login}</span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentList;
