"use client";

import { usePrivy } from '@privy-io/react-auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { baseSepolia, base } from 'viem/chains';
import { encodeFunctionData, createPublicClient, http } from 'viem';

export const DEFAULT_CHAIN_ID = 
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : base.id;

// Create a Viem public client to interact with the blockchain
const publicClient = createPublicClient({
  chain: DEFAULT_CHAIN_ID === baseSepolia.id ? baseSepolia : base,
  transport: http(),
});

// Function to convert BigInt to strings for serialization
const stringifyArgs = (args) => {
  if (!args) return '';
  return args.map(arg => 
    typeof arg === 'bigint' ? arg.toString() : arg
  ).join(',');
};

// Simplify the function to directly use the wallet API
const switchToRequiredNetwork = async () => {
  if (!window.ethereum) return false;
  
  try {
    // This method automatically triggers confirmation in the wallet
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${DEFAULT_CHAIN_ID.toString(16)}` }],
    });
    return true;
  } catch (switchError) {
    // If the network is not added to the wallet
    if (switchError.code === 4902) {
      const networkParams = DEFAULT_CHAIN_ID === baseSepolia.id 
        ? {
            chainId: `0x${baseSepolia.id.toString(16)}`,
            chainName: 'Base Sepolia',
            nativeCurrency: {
              name: 'Sepolia Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://sepolia.base.org'],
            blockExplorerUrls: ['https://sepolia.basescan.org'],
          }
        : {
            chainId: `0x${base.id.toString(16)}`,
            chainName: 'base Mainnet',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.base.build'],
            blockExplorerUrls: ['https://basescan.build'],
          };
      
      // This method also triggers a confirmation in the wallet
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkParams],
      });
      return true;
    }
    console.error("Error switching chain:", switchError);
    return false;
  }
};

// This hook adapts the Privy interface to the one used by Wagmi in your codebase
export function usePrivyAdapter() {
  const privy = usePrivy();
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);
  
  // Check and request network change if necessary
  useEffect(() => {
    const checkAndSwitchChain = async () => {
      if (privy.authenticated && privy.user?.wallet?.address && window.ethereum) {
        try {
          // Get the current chain
          const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
          const chainId = parseInt(chainIdHex, 16);
          
          // If the user is not on the correct chain, ask to change
          if (chainId !== DEFAULT_CHAIN_ID) {
            console.log(`User on chain ${chainId}, need to switch to ${DEFAULT_CHAIN_ID}`);
            try {
              // Try to switch networks
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${DEFAULT_CHAIN_ID.toString(16)}` }],
              });
              console.log("Switched to required network");
            } catch (switchError) {
              // If the network is not configured, offer to add it
              if (switchError.code === 4902) {
                const networkParams = DEFAULT_CHAIN_ID === baseSepolia.id 
                  ? {
                      chainId: `0x${baseSepolia.id.toString(16)}`,
                      chainName: 'Base Sepolia',
                      nativeCurrency: {
                        name: 'Sepolia Ether',
                        symbol: 'ETH',
                        decimals: 18,
                      },
                      rpcUrls: ['https://sepolia.base.org'],
                      blockExplorerUrls: ['https://sepolia.basescan.org'],
                    }
                  : {
                      chainId: `0x${base.id.toString(16)}`,
                      chainName: 'base Mainnet',
                      nativeCurrency: {
                        name: 'Ether',
                        symbol: 'ETH',
                        decimals: 18,
                      },
                      rpcUrls: ['https://rpc.base.build'],
                      blockExplorerUrls: ['https://basescan.build'],
                    };
                
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [networkParams],
                });
              }
            }
          }
        } catch (error) {
          console.error("Error checking/switching chain:", error);
        }
      }
    };
    
    checkAndSwitchChain();
  }, [privy.authenticated, privy.user?.wallet?.address]);
  
  // Adapter for useAccount
  const account = useMemo(() => ({
    isConnected: privy.authenticated && !!privy.user?.wallet?.address,
    address: privy.user?.wallet?.address,
    chain: { id: DEFAULT_CHAIN_ID },
  }), [privy.authenticated, privy.user?.wallet?.address]);
  
  // Adapter for useConnect
  const connectAdapter = useMemo(() => ({
    connectors: privy.authenticated ? [] : [{ id: 'privy' }],
    connect: async ({ chainId }) => {
      setCurrentChainId(chainId);
      try {
        // Connect the user with their external wallet
        await privy.login();
        return true;
      } catch (err) {
        console.error("Error connecting:", err);
        return false;
      }
    },
    isPending: privy.authenticated === null || privy.isLoading,
  }), [privy.authenticated, privy.isLoading, privy.login]);
  
  // Adapter for useDisconnect
  const disconnectAdapter = useMemo(() => ({
    disconnect: privy.logout,
  }), [privy.logout]);
  
  // Adapter for useSwitchChain
  const switchChainAdapter = useMemo(() => ({
    switchChain: async ({ chainId }) => {
      // For external wallets, use the native wallet methods
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
          });
          setCurrentChainId(chainId);
          return { id: chainId };
        } catch (error) {
          // If the network is not configured, offer to add it
          if (error.code === 4902) {
            const networkParams = chainId === baseSepolia.id 
              ? {
                  chainId: `0x${baseSepolia.id.toString(16)}`,
                  chainName: 'Base Sepolia',
                  nativeCurrency: {
                    name: 'Sepolia Ether',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://sepolia.base.org'],
                  blockExplorerUrls: ['https://sepolia.basescan.org'],
                }
              : {
                  chainId: `0x${base.id.toString(16)}`,
                  chainName: 'Base Mainnet',
                  nativeCurrency: {
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://rpc.base.build'],
                  blockExplorerUrls: ['https://basescan.build'],
                };
            
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networkParams],
            });
            return { id: chainId };
          }
          console.error("Error switching chain:", error);
          throw error;
        }
      }
      
      setCurrentChainId(chainId);
      return { id: chainId };
    },
    chains: [baseSepolia, base],
  }), []);
  
  // Adapter for useReadContract
  const readContractAdapter = useCallback(({ abi, address, functionName, args }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await publicClient.readContract({
          abi,
          address,
          functionName,
          args,
        });
        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.error('Error reading contract:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [address, functionName, stringifyArgs(args)]);

    return { data, isLoading, error };
  }, []);
  
  // Adapter for useWriteContract
  const writeContractAdapter = useMemo(() => ({
    writeContractAsync: async (params) => {
      if (!privy.authenticated) throw new Error("User not authenticated");
      if (!privy.user?.wallet?.address) throw new Error("No wallet connected");
      
      // Encode function data with viem
      const data = encodeFunctionData({
        abi: params.abi,
        functionName: params.functionName,
        args: params.args,
      });
      
      try {
        // For external wallets (like MetaMask), use the ethereum interface
        if (window.ethereum) {
          // Convert value to hex
          let valueHex = '0x0';
          if (params.value) {
            // Ensure value is handled correctly, whether it's a BigInt or a number
            const valueBigInt = typeof params.value === 'bigint' 
              ? params.value 
              : BigInt(params.value.toString());
            valueHex = `0x${valueBigInt.toString(16)}`;
          }
          
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
              from: privy.user.wallet.address,
              to: params.address,
              data,
              value: valueHex,
            }],
          });
          return txHash;
        } else {
          throw new Error("No Ethereum provider found");
        }
      } catch (error) {
        console.error("Error sending transaction:", error);
        throw error;
      }
    }
  }), [privy.authenticated, privy.user?.wallet?.address]);

  return {
    // Exports corresponding to the hooks Wagmi that you use
    useAccount: () => account,
    useConnect: () => connectAdapter,
    useDisconnect: () => disconnectAdapter,
    useSwitchChain: () => switchChainAdapter,
    useWriteContract: () => writeContractAdapter,
    useReadContract: readContractAdapter,
    
    // Direct access to Privy for specific features
    privy,
  };
}
