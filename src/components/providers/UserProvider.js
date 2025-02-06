import { createContext, useState, useEffect } from "react";
import { useAccount } from "wagmi";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected || !address) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      const response = await fetch(`/user/${address}`);
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [isConnected, address]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
