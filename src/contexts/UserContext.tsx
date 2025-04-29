"use client";

import { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useGetUserPositionsData } from "@/hooks/useGetUserPositionsData";
import { usePrivyAdapter } from "@/hooks/usePrivyAuth";

export interface User {
  address: string;
  vaultPositions: Array<{ 
    vaultId: string; 
    tripleId: string;
    shares: string; 
    value: string; 
  }>;
  counterVaultPositions: Array<{ 
    vaultId: string; 
    tripleId: string;
    shares: string; 
    value: string;  
  }>;
}

export interface UserContextType {
  user: User | null;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { useAccount } = usePrivyAdapter();
  const { address, isConnected } = useAccount();
  const { getUserPositionsData } = useGetUserPositionsData();

  const refreshUser = useCallback(async () => {
    if (!isConnected || !address) {
      setUser(null);
      return;
    }

    try {
      const { vaultPositions, counterVaultPositions } = await getUserPositionsData(address);
      
      const userData: User = {
        address,
        vaultPositions,
        counterVaultPositions
      };
      
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  }, [isConnected, address, getUserPositionsData]);

  useEffect(() => {
    refreshUser();
  }, [isConnected, address, refreshUser]);

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
