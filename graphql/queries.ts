import { gql } from "@apollo/client";

export const SEARCH_ISSUES = gql`
  query SearchIssues($query: String!) {
    search(query: $query, type: ISSUE, first: 20) {
      nodes {
        ... on Issue {
          id
          number
          title
          state
          createdAt
          author {
            login
            avatarUrl
          }
        }
      }
    }
  }
`;
