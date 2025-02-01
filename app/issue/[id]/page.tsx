import { BackButton, CommentList, IssueDetails } from "@/components";
import client from "@/graphql/apollo-client";
import {
  Comment,
  GetIssueQuery,
  GetIssueQueryVariables,
  Issue,
} from "@/graphql/generated";
import { GET_ISSUE } from "@/graphql/queries";
import { ApolloError } from "@apollo/client";

type IssuePageParams = {
  searchParams: Promise<{
    repoOwner: string;
    repoName: string;
    number: string;
  }>;
};

async function IssuePage({ searchParams }: IssuePageParams) {
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
    const comments = issue?.comments?.nodes;

    if (error)
      return <p className="text-red-500 text-center">Error: {error.message}</p>;

    if (!issue)
      return <p className="text-gray-600 text-center">Issue not found</p>;

    return (
      <>
        <BackButton text="Go back to the list" />
        <IssueDetails issue={issue as Issue} />
        <CommentList comments={comments as Comment[]} />
      </>
    );
  } catch (e) {
    const error = e as Error;

    if (error instanceof ApolloError) {
      return (
        <>
          <BackButton text="Go back to the list" />
          <p className="text-red-500 text-center">{error.message}</p>
        </>
      );
    }
  }
}

export default IssuePage;
