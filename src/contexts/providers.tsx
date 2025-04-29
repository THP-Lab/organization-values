"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserProvider } from "./UserContext";
import { PrivyProvider } from '@privy-io/react-auth';

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const client = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  if (!privyAppId) {
    console.error("NEXT_PUBLIC_PRIVY_APP_ID environment variable is not defined");
    return <div>Error: Configuration issue. Please contact support.</div>;
  }
  
  if (!isMounted) {
    return null;
  }
  
  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['wallet', 'email', 'google'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
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
