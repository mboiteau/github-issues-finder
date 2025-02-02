export const nodes = [
  {
    id: "I_kwDOAJy2Ks6obVsT",
    number: 32292,
    title: "Bug: React 19v",
    state: "OPEN",
    createdAt: "2025-02-02T11:02:28Z",
    author: {
      login: "Sardorbek-Kuvondikov",
      avatarUrl:
        "https://avatars.githubusercontent.com/u/161136671?u=23a75f59aac5298668ce206ffa5ba9d09963b4b9&v=4",
      __typename: "User",
    },
    repository: {
      name: "react",
      owner: {
        login: "facebook",
        __typename: "Organization",
      },
      __typename: "Repository",
    },
    __typename: "Issue",
  },
  {
    id: "I_kwDOAJy2Ks6oY4XP",
    number: 32290,
    title: "Bug: pre-trigger form submit in multistep form",
    state: "OPEN",
    createdAt: "2025-02-01T09:15:29Z",
    author: {
      login: "evgeniyworkbel",
      avatarUrl:
        "https://avatars.githubusercontent.com/u/93836126?u=c252a7cc61c3789828645f421fd6324fb62e3d1c&v=4",
      __typename: "User",
    },
    repository: {
      name: "react",
      owner: {
        login: "facebook",
        __typename: "Organization",
      },
      __typename: "Repository",
    },
    __typename: "Issue",
  },
  {
    id: "I_kwDOAJy2Ks6oY18h",
    number: 32289,
    title: "Bug:",
    state: "OPEN",
    createdAt: "2025-02-01T08:55:14Z",
    author: {
      login: "wedothebest4you",
      avatarUrl: "https://avatars.githubusercontent.com/u/146404549?v=4",
      __typename: "User",
    },
    repository: {
      name: "react",
      owner: {
        login: "facebook",
        __typename: "Organization",
      },
      __typename: "Repository",
    },
    __typename: "Issue",
  },
  {
    id: "I_kwDOAJy2Ks6oUZs1",
    number: 32282,
    title: "[React 19]",
    state: "CLOSED",
    createdAt: "2025-01-31T16:22:30Z",
    author: {
      login: "pepe1295",
      avatarUrl: "https://avatars.githubusercontent.com/u/193150926?v=4",
      __typename: "User",
    },
    repository: {
      name: "react",
      owner: {
        login: "facebook",
        __typename: "Organization",
      },
      __typename: "Repository",
    },
    __typename: "Issue",
  },
];

export const mockIssuesResult = {
  data: {
    search: {
      nodes: nodes.slice(0, 2),
      pageInfo: {
        endCursor: "Y3Vyc29yOjI=",
        hasNextPage: true,
        __typename: "PageInfo",
      },
      __typename: "SearchResultItemConnection",
    },
  },
};

export const mockLoadMoreIssuesResult = {
  data: {
    search: {
      nodes: nodes.slice(2, 4),
      pageInfo: {
        endCursor: "Y3Vyc29yOjEw",
        hasNextPage: false,
        __typename: "PageInfo",
      },
      __typename: "SearchResultItemConnection",
    },
  },
};

export const mockIssuesFilteredResult = {
  data: {
    search: {
      nodes: [nodes[0]],
      pageInfo: {
        endCursor: "Y3Vyc29yOjEw",
        hasNextPage: true,
        __typename: "PageInfo",
      },
      __typename: "SearchResultItemConnection",
    },
  },
};
