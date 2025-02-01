import { Issue } from "@/graphql/generated";
import Link from "next/link";
import AvatarProfile from "./AvatarProfile";
import StatusBadge from "./StatusBadge";

interface IssueListProps {
  issues: Issue[];
  loading: boolean;
  error?: Error;
}

function IssueList({ issues, loading, error }: IssueListProps) {
  if (loading)
    return <p className="mt-4 text-gray-600 text-center">Loading...</p>;
  if (error)
    return (
      <p className="mt-4 text-red-500 text-center">Error: {error.message}</p>
    );
  if (issues.length === 0)
    return <p className="mt-4 text-gray-600 text-center">No issues found</p>;

  return (
    <ul className="max-w-4xl mt-4 mx-auto flex flex-col gap-4">
      {issues.map((issue) => (
        <li
          key={issue.id}
          className="border bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <Link
            href={`/issue/${issue.id}?repoOwner=${issue.repository.owner.login}&repoName=${issue.repository.name}&number=${issue.number}`}
            className="flex items-center gap-10 p-4"
          >
            <div className="flex flex-col items-center w-16">
              <AvatarProfile imageUrl={issue.author?.avatarUrl} size={40} />
              <span className="text-xs text-gray-500">
                {issue?.author?.login}
              </span>
            </div>
            <div>
              <StatusBadge status={issue.state} />
              <div className="flex-1 mt-3">{issue.title}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default IssueList;
