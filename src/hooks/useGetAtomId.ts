import { useCallback } from "react";
import { useApolloClient } from "@apollo/client";
import { getAtomIDsByUriQuery } from "@/backend/queries";

export function useGetAtomId() {
  const client = useApolloClient();

  const getAtomId = useCallback(
    async (uri: string) => {
      try {
        const { data, error } = await client.query({
          query: getAtomIDsByUriQuery,
          variables: { uri },
        });

        if (error) {
          console.error("Error fetching atom ID:", error);
          return null;
        }

        if (!data || !data.atomEntities || data.atomEntities.length === 0) {
          return null;
        }

        return data.atomEntities[0].id;
      } catch (err) {
        console.error("Error in getAtomId:", err);
        return null;
      }
    },
    [client]
  );

  return { getAtomId };
}
