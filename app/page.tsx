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

function Home() {
  const initialQuery = "repo:facebook/react is:issue";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { loading, error, data } = useQuery<
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

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Github issues finder</h1>
      <SearchBar handleSearch={handleSearch} />
      <IssueList
        loading={loading}
        error={error}
        issues={(data?.search?.nodes as Issue[]) || []}
      />
    </>
  );
}

export default Home;
