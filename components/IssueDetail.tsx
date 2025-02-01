import { Issue } from "@/graphql/generated";
import AvatarProfile from "./AvatarProfile";
import StatusBadge from "./StatusBadge";

interface IssueDetailProps {
  issue: Issue;
}

function IssueDetail({ issue }: IssueDetailProps) {
  return (
    <div className="relative max-w-4xl mx-auto mt-6 p-6 bg-white shadow-sm rounded-lg">
      <div className="absolute -top-6 -left-6 w-14 h-14">
        <AvatarProfile imageUrl={issue.author?.avatarUrl} size={56} />
      </div>
      <h1 className="text-2xl  font-semibold">{issue.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Issue #{issue.number}</p>
      <div className="flex flex-col gap-2">
        <p>
          <b className="mr-1">Status:</b>
          <StatusBadge status={issue.state} />
        </p>
        <p>
          <b>Created at:</b> {new Date(issue.createdAt).toLocaleString()}
        </p>
        <p>
          <b>Author:</b> {issue.author?.login}
        </p>
        <p>
          <b>Body:</b>
        </p>
        <p>{issue.body}</p>
      </div>
    </div>
  );
}

export default IssueDetail;
