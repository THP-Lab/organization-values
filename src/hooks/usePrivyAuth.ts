"use client";

import { usePrivy } from '@privy-io/react-auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { baseSepolia, linea } from 'viem/chains';
import { encodeFunctionData, createPublicClient, http } from 'viem';

export const DEFAULT_CHAIN_ID = 
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : linea.id;

// Créer un client public Viem pour interagir avec la blockchain
const publicClient = createPublicClient({
  chain: DEFAULT_CHAIN_ID === baseSepolia.id ? baseSepolia : linea,
  transport: http(),
});

// Fonction pour convertir les BigInt en chaînes pour la sérialisation
const stringifyArgs = (args) => {
  if (!args) return '';
  return args.map(arg => 
    typeof arg === 'bigint' ? arg.toString() : arg
  ).join(',');
};

// Simplifiez la fonction pour utiliser directement l'API du wallet
const switchToRequiredNetwork = async () => {
  if (!window.ethereum) return false;
  
  try {
    // Cette méthode déclenche automatiquement la confirmation dans le wallet
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${DEFAULT_CHAIN_ID.toString(16)}` }],
    });
    return true;
  } catch (switchError) {
    // Si le réseau n'est pas ajouté au wallet
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
            chainId: `0x${linea.id.toString(16)}`,
            chainName: 'Linea Mainnet',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.linea.build'],
            blockExplorerUrls: ['https://lineascan.build'],
          };
      
      // Cette méthode déclenche aussi une confirmation dans le wallet
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

// Ce hook adapte l'interface Privy à celle utilisée par Wagmi dans votre codebase
export function usePrivyAdapter() {
  const privy = usePrivy();
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);
  
  // Vérifier et demander le changement de réseau si nécessaire
  useEffect(() => {
    const checkAndSwitchChain = async () => {
      if (privy.authenticated && privy.user?.wallet?.address && window.ethereum) {
        try {
          // Obtenir la chaîne actuelle
          const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
          const chainId = parseInt(chainIdHex, 16);
          
          // Si l'utilisateur n'est pas sur la bonne chaîne, demander de changer
          if (chainId !== DEFAULT_CHAIN_ID) {
            console.log(`User on chain ${chainId}, need to switch to ${DEFAULT_CHAIN_ID}`);
            try {
              // Essayer de changer de réseau
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${DEFAULT_CHAIN_ID.toString(16)}` }],
              });
              console.log("Switched to required network");
            } catch (switchError) {
              // Si le réseau n'est pas configuré, proposer de l'ajouter
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
                      chainId: `0x${linea.id.toString(16)}`,
                      chainName: 'Linea Mainnet',
                      nativeCurrency: {
                        name: 'Ether',
                        symbol: 'ETH',
                        decimals: 18,
                      },
                      rpcUrls: ['https://rpc.linea.build'],
                      blockExplorerUrls: ['https://lineascan.build'],
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
  
  // Adapter pour useAccount
  const account = useMemo(() => ({
    isConnected: privy.authenticated && !!privy.user?.wallet?.address,
    address: privy.user?.wallet?.address,
    chain: { id: DEFAULT_CHAIN_ID },
  }), [privy.authenticated, privy.user?.wallet?.address]);
  
  // Adapter pour useConnect
  const connectAdapter = useMemo(() => ({
    connectors: privy.authenticated ? [] : [{ id: 'privy' }],
    connect: async ({ chainId }) => {
      setCurrentChainId(chainId);
      try {
        // Connecter l'utilisateur avec son wallet externe
        await privy.login();
        return true;
      } catch (err) {
        console.error("Error connecting:", err);
        return false;
      }
    },
    isPending: privy.authenticated === null || privy.isLoading,
  }), [privy.authenticated, privy.isLoading, privy.login]);
  
  // Adapter pour useDisconnect
  const disconnectAdapter = useMemo(() => ({
    disconnect: privy.logout,
  }), [privy.logout]);
  
  // Adapter pour useSwitchChain
  const switchChainAdapter = useMemo(() => ({
    switchChain: async ({ chainId }) => {
      // Pour les wallets externes, utiliser les méthodes natives du wallet
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
          });
          setCurrentChainId(chainId);
          return { id: chainId };
        } catch (error) {
          // Si le réseau n'est pas configuré, proposer de l'ajouter
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
                  chainId: `0x${linea.id.toString(16)}`,
                  chainName: 'Linea Mainnet',
                  nativeCurrency: {
                    name: 'Ether',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://rpc.linea.build'],
                  blockExplorerUrls: ['https://lineascan.build'],
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
    chains: [baseSepolia, linea],
  }), []);
  
  // Adapter pour useReadContract
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
  
  // Adapter pour useWriteContract
  const writeContractAdapter = useMemo(() => ({
    writeContractAsync: async (params) => {
      if (!privy.authenticated) throw new Error("User not authenticated");
      if (!privy.user?.wallet?.address) throw new Error("No wallet connected");
      
      // Encoder les données de fonction avec viem
      const data = encodeFunctionData({
        abi: params.abi,
        functionName: params.functionName,
        args: params.args,
      });
      
      try {
        // Pour les wallets externes (comme MetaMask), utiliser l'interface ethereum
        if (window.ethereum) {
          // Convertir value en hex
          let valueHex = '0x0';
          if (params.value) {
            // Assurer que value est géré correctement, qu'il soit un BigInt ou un nombre
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
    // Exports correspondant aux hooks Wagmi que vous utilisez
    useAccount: () => account,
    useConnect: () => connectAdapter,
    useDisconnect: () => disconnectAdapter,
    useSwitchChain: () => switchChainAdapter,
    useWriteContract: () => writeContractAdapter,
    useReadContract: readContractAdapter,
    
    // Accès direct à Privy pour les fonctionnalités spécifiques
    privy,
  };
}
