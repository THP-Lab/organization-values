import { ApolloClient, InMemoryCache } from "@apollo/client";

export const gqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});
