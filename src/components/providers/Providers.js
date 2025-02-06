"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { linea, baseSepolia } from "wagmi/chains";
import UserProvider from "./UserProvider";

export const wagmiConfig = createConfig({
  chains: [process.env.NODE_ENV === "development" ? baseSepolia : linea],
  connectors: [metaMask()],
  transports: {
    [process.env.NODE_ENV === "development" ? baseSepolia.id : linea.id]:
      http(),
  },
  ssr: true,
});

const client = new QueryClient();

const Providers = ({ children }) => {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={client}>
          <UserProvider>{children}</UserProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default Providers;
