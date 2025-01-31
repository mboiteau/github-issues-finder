"use client";

import { SearchBar } from "@/components";
import IssueList from "@/components/IssueList";
import { Status } from "@/constants";
import { SEARCH_ISSUES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

function Home() {
  const initialQuery = "repo:facebook/react is:issue";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { loading, error, data } = useQuery(SEARCH_ISSUES, {
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
        issues={data?.search?.nodes || []}
      />
    </>
  );
}

export default Home;
