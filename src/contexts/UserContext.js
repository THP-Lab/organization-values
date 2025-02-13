import { createContext, useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { useGetUserPositions } from "@/hooks/useGetUserPositionsData";
import { set } from "zod";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
