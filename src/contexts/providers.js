"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { linea, baseSepolia } from "wagmi/chains";
import { UserProvider } from "./UserContext";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const targetChain =
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia : linea;

export const wagmiConfig = createConfig({
  chains: [targetChain],
  connectors: [
    metaMask({
      chains: [targetChain],
      defaultChainId: targetChain.id,
      shimDisconnect: true,
      shimChainChangedNavigate: true,
    }),
  ],
  transports: {
    [targetChain.id]: http(),
  },
  ssr: true,
});

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const client = new QueryClient();

const Providers = ({ children }) => {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={client}>
          <ApolloProvider client={apolloClient}>
            <UserProvider>{children}</UserProvider>
          </ApolloProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default Providers;
