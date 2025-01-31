import { BackButton } from "@/components";
import client from "@/graphql/apollo-client";
import { GetIssueQuery, GetIssueQueryVariables } from "@/graphql/generated";
import { GET_ISSUE } from "@/graphql/queries";

type IssueDetailParams = {
  searchParams: Promise<{
    repoOwner: string;
    repoName: string;
    number: string;
  }>;
};

async function IssueDetail({ searchParams }: IssueDetailParams) {
  const { repoOwner, repoName, number } = await searchParams;

  try {
    const { error, data } = await client.query<
      GetIssueQuery,
      GetIssueQueryVariables
    >({
      query: GET_ISSUE,
      variables: { owner: repoOwner, name: repoName, number: parseInt(number) },
    });
    const issue = data?.repository?.issue;

    if (error)
      return <p className="text-red-500 text-center">Error: {error.message}</p>;

    if (!issue)
      return <p className="text-gray-600 text-center">Issue not found</p>;

    return (
      <>
        <BackButton text="Go back to the list" />
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-lg">
          <h1 className="text-2xl  font-semibold">{issue.title}</h1>
          <p className="text-sm text-gray-500 mb-4">Issue #{issue.number}</p>
          <div className="flex flex-col gap-2">
            <p>
              <b>Status:</b> {issue.state}
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
      </>
    );
  } catch (e) {
    const error = e as Error;
    return (
      <>
        <BackButton text="Go back to the list" />
        <p className="text-red-500 text-center">{error.message}</p>
      </>
    );
  }
}

export default IssueDetail;
