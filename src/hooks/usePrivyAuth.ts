"use client";

import { usePrivy } from '@privy-io/react-auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { baseSepolia, base } from 'viem/chains';
import { encodeFunctionData, createPublicClient, http, createWalletClient, custom } from 'viem';

export const DEFAULT_CHAIN_ID = 
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : base.id;

// Créer un client public Viem pour interagir avec la blockchain
const publicClient = createPublicClient({
  chain: DEFAULT_CHAIN_ID === baseSepolia.id ? baseSepolia : base,
  transport: http(),
});

// Fonction pour convertir les BigInt en chaînes pour la sérialisation
const stringifyArgs = (args: any[] | undefined): string => {
  if (!args) return '';
  return args.map(arg => 
    typeof arg === 'bigint' ? arg.toString() : arg
  ).join(',');
};

// Fonction utilitaire pour vérifier si une erreur a un code spécifique
function isErrorWithCode(error: unknown, code: number): boolean {
  return (
    typeof error === 'object' && 
    error !== null && 
    'code' in error && 
    (error as { code: number }).code === code
  );
}

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
  } catch (switchError: unknown) {
    if (isErrorWithCode(switchError, 4902)) {
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
              if (isErrorWithCode(switchError, 4902)) {
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
  
  // Adapter pour useAccount
  const account = useMemo(() => ({
    isConnected: privy.authenticated && !!privy.user?.wallet?.address,
    address: privy.user?.wallet?.address,
    chain: { id: DEFAULT_CHAIN_ID },
  }), [privy.authenticated, privy.user?.wallet?.address]);
  
  // Adapter pour useConnect
  const connectAdapter = useMemo(() => ({
    connectors: privy.authenticated ? [] : [{ id: 'privy' }],
    connect: async ({ chainId }: { chainId: number }) => {
      setCurrentChainId(chainId);
      try {
        // Connecter l'utilisateur avec son wallet externe
        await privy.login();
      } catch (error) {
        console.error("Erreur lors de la connexion Privy:", error);
      }
    },
    isPending: privy.authenticated === null || !privy.ready,
  }), [privy.authenticated, privy.ready, privy.login]);
  
  // Adapter pour useDisconnect
  const disconnectAdapter = useMemo(() => ({
    disconnect: privy.logout,
  }), [privy.logout]);
  
  // Adapter pour useSwitchChain
  const switchChainAdapter = useMemo(() => ({
    switchChain: async ({ chainId }: { chainId: number }) => {
      // Pour les wallets externes, utiliser les méthodes natives du wallet
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
          });
          setCurrentChainId(chainId);
          return { id: chainId };
        } catch (switchError: unknown) {
          // Si le réseau n'est pas configuré, proposer de l'ajouter
          if (isErrorWithCode(switchError, 4902)) {
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
          console.error("Error switching chain:", switchError);
          throw switchError;
        }
      }
      
      setCurrentChainId(chainId);
      return { id: chainId };
    },
    chains: [baseSepolia, base],
  }), []);
  
  // Modifier l'interface ReadContractParams pour utiliser le bon type d'adresse
  interface ReadContractParams {
    abi: any[]; // Idéalement, utilisez un type plus précis pour l'ABI
    address: string; // Garder string ici pour la compatibilité
    functionName: string;
    args?: any[]; // Arguments de fonction, optionnels
  }

  // Adapter pour useReadContract
  const readContractAdapter = useCallback(({ 
    abi, 
    address, 
    functionName, 
    args 
  }: ReadContractParams) => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Utiliser une assertion de type pour convertir address en `0x${string}`
        const result = await publicClient.readContract({
          abi,
          address: address as `0x${string}`,
          functionName,
          args: args || [],
        });
        setData(result);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [abi, address, functionName, args]);

    return { data, isLoading, error };
  }, []);
  
  // Modifier l'interface WriteContractParams pour accepter différents types pour value
  interface WriteContractParams {
    abi: any[];
    address: string;
    functionName: string;
    args?: any[];
    value?: bigint | string | number; // Accepter différents types pour la valeur
  }

  // Adapter pour useWriteContract
  const writeContractAdapter = useMemo(() => ({
    writeContractAsync: async (params: WriteContractParams) => {
      if (!privy.authenticated) throw new Error("User not authenticated");
      if (!privy.user?.wallet?.address) throw new Error("No wallet connected");
      
      try {
        // Créer un walletClient temporaire
        const walletClient = createWalletClient({
          chain: DEFAULT_CHAIN_ID === baseSepolia.id ? baseSepolia : base,
          transport: custom(window.ethereum),
        });
        
        // Générer les données de transaction
        const data = encodeFunctionData({
          abi: params.abi,
          functionName: params.functionName, 
          args: params.args || [],
        });
        
        // Préparer la valeur si elle existe
        let valueHex;
        if (params.value !== undefined) {
          if (typeof params.value === 'bigint') {
            valueHex = `0x${params.value.toString(16)}`;
          } else if (typeof params.value === 'number') {
            valueHex = `0x${params.value.toString(16)}`;
          } else {
            // Si c'est une chaîne, on suppose qu'elle peut être convertie en BigInt
            valueHex = `0x${BigInt(params.value).toString(16)}`;
          }
        }
        
        // Exécuter la transaction avec ethereum.request
        const hash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: privy.user.wallet.address,
            to: params.address,
            data, // Maintenant data est défini!
            ...(valueHex ? { value: valueHex } : {}),
          }],
        });
        
        return hash;
      } catch (error) {
        console.error("Transaction error:", error);
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
