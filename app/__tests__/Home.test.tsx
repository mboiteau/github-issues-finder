import { SEARCH_ISSUES } from "@/graphql/queries";
import { mockIssuesFilteredResult, mockIssuesResult } from "@/mocks";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { GraphQLError } from "graphql";
import Home from "../page";

describe("Home", () => {
  const issuesMock = {
    request: {
      query: SEARCH_ISSUES,
      variables: { query: "repo:facebook/react is:issue" },
    },
    result: mockIssuesResult,
  };

  test("fetch and display issues", async () => {
    render(
      <MockedProvider mocks={[issuesMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(
      await screen.findByText(mockIssuesResult.data.search.nodes[0].title)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        mockIssuesResult.data.search.nodes[0].author.login
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockIssuesResult.data.search.nodes[1].title)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        mockIssuesResult.data.search.nodes[1].author.login
      )
    ).toBeInTheDocument();
  });

  test("filter issues based on search query", async () => {
    const filteredIssuesMock = {
      ...issuesMock,
      request: {
        ...issuesMock.request,
        variables: {
          query: "repo:facebook/react is:issue Bug: React 19v in:title,body",
        },
      },
      result: mockIssuesFilteredResult,
    };
    render(
      <MockedProvider
        mocks={[issuesMock, filteredIssuesMock]}
        addTypename={false}
      >
        <Home />
      </MockedProvider>
    );

    expect(await screen.findByText("Bug: React 19v")).toBeInTheDocument();
    expect(
      await screen.findByText("Bug: pre-trigger form submit in multistep form")
    ).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: "Search" });

    fireEvent.change(searchInput, { target: { value: "Bug: React 19v" } });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Bug: React 19v")).toBeInTheDocument();
    expect(
      screen.queryByText("Bug: pre-trigger form submit in multistep form")
    ).not.toBeInTheDocument();
  });

  test("display loading state", async () => {
    const loadingIssuesMock = { ...issuesMock, delay: Infinity };

    render(
      <MockedProvider mocks={[loadingIssuesMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  test("display network error message", async () => {
    const errorIssuesMock = {
      ...issuesMock,
      error: new Error("An error occurred"),
    };

    render(
      <MockedProvider mocks={[errorIssuesMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(
      await screen.findByText("Error: An error occurred")
    ).toBeInTheDocument();
  });

  test("display graphql error message", async () => {
    const errorIssuesMock = {
      ...issuesMock,
      result: { errors: [new GraphQLError("Graphql Error")] },
    };

    render(
      <MockedProvider mocks={[errorIssuesMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(await screen.findByText("Error: Graphql Error")).toBeInTheDocument();
  });
});
