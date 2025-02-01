"use client";

import { IssueList, SearchBar } from "@/components";
import { Status } from "@/constants";
import {
  Issue,
  SearchIssuesQuery,
  SearchIssuesQueryVariables,
} from "@/graphql/generated";
import { SEARCH_ISSUES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const initialQuery = "repo:facebook/react is:issue";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { loading, error, data, fetchMore } = useQuery<
    SearchIssuesQuery,
    SearchIssuesQueryVariables
  >(SEARCH_ISSUES, {
    variables: { query: searchQuery },
  });

  const handleSearch = (searchText: string, status: Status) => {
    setSearchQuery(
      `${initialQuery}${searchText ? ` ${searchText} in:title,body` : ""}${
        status !== Status.ALL ? ` is:${status}` : ""
      } `
    );
  };

  function loadMore() {
    if (!hasNextPage || !endCursor) return;
    fetchMore({
      variables: {
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousSearchNodes =
          (previousResult.search?.nodes as Issue[]) || [];
        const fetchMoreSearchNodes =
          (fetchMoreResult.search?.nodes as Issue[]) || [];

        return {
          search: {
            ...fetchMoreResult.search,
            nodes: [...previousSearchNodes, ...fetchMoreSearchNodes],
            pageInfo: fetchMoreResult.search.pageInfo,
          },
        };
      },
    });
  }

  const endCursor = data?.search.pageInfo.endCursor;
  const hasNextPage = data?.search.pageInfo.hasNextPage || false;
  const issues = data?.search.nodes as Issue[];

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Github issues finder</h1>
      <SearchBar handleSearch={handleSearch} />
      <InfiniteScroll
        dataLength={issues?.length || 0}
        next={loadMore}
        hasMore={hasNextPage}
        loader={<p className="mt-4 text-gray-600 text-center">Loading...</p>}
      >
        <IssueList
          issues={(data?.search?.nodes as Issue[]) || []}
          loading={loading}
          error={error}
        />
      </InfiniteScroll>
    </>
  );
}

export default Home;
