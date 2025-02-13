import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { getAtomIDsByUriQuery } from "@/backend/queries";

export function useGetAtomId() {
  const client = useApolloClient();

  const getAtomId = useCallback(
    async (uri) => {
      try {
        const { data, error } = await client.query({
          query: getAtomIDsByUriQuery,
          variables: {
            uri,
          },
          fetchPolicy: "network-only", // Disable caching
        });

        if (error) {
          throw error;
        }

        if (data.atoms && data.atoms.length > 0) {
          return data.atoms[0].id;
        }

        return null;
      } catch (err) {
        console.error("Error getting atom ID:", err);
        throw err;
      }
    },
    [client]
  );

  return { getAtomId };
}
