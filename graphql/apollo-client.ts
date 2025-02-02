import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ISSUES_FINDER_GITHUB_TOKEN}`,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
