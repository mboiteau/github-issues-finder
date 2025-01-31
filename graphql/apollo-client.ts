import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      //TODO - to be replaced by a token from the environment
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ISSUES_FINDER_GITHUB_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
