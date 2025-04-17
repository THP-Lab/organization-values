"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserProvider } from "./UserContext";
import { PrivyProvider } from '@privy-io/react-auth';
import { useEffect, useState } from "react";

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const client = new QueryClient();

const Providers = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null; // Ne rend rien côté serveur
  }
  
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email', 'google'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          noPromptOnSignature: true,
        },
      }}
    >
      <QueryClientProvider client={client}>
        <ApolloProvider client={apolloClient}>
          <UserProvider>{children}</UserProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default Providers;
