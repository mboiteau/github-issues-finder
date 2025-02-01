import { gql } from "@apollo/client";

export const SEARCH_ISSUES = gql`
  query SearchIssues($query: String!, $after: String) {
    search(query: $query, type: ISSUE, first: 10, after: $after) {
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
          repository {
            name
            owner {
              login
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_ISSUE = gql`
  query GetIssue($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        id
        number
        title
        body
        state
        createdAt
        author {
          login
          avatarUrl
        }
        comments(first: 100) {
          nodes {
            id
            body
            createdAt
            author {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`;
