"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { useGetUserPositions } from "@/hooks/useGetUserPositionsData";
import { usePrivyAdapter } from "@/hooks/usePrivyAuth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { useAccount } = usePrivyAdapter();
  const { address, isConnected } = useAccount();
  const { getUserPositionsData } = useGetUserPositions();

  const refreshUser = useCallback(async () => {
    if (!isConnected || !address) {
      setUser(null);
      return;
    }

    try {
      const data = await getUserPositionsData(address);
      setUser(data);
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
