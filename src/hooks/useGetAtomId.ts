import { useApolloClient, gql } from "@apollo/client";
import { useCallback } from "react";

const GET_ATOM_BY_DATA = gql`
  query GetAtomByData($data: String!) {
    atoms(where: { data: { _eq: $data } }) {
      id
    }
  }
`;

export function useGetAtomId() {
  const client = useApolloClient();

  const getAtomId = useCallback(
    async (uri) => {
      try {
        const { data, error } = await client.query({
          query: GET_ATOM_BY_DATA,
          variables: { data: uri },
          fetchPolicy: "network-only",
        });

        if (error) throw error;

        return data.atoms?.[0]?.id ?? null;
      } catch (err) {
        console.error("Error getting atom ID:", err);
        throw err;
      }
    },
    [client]
  );

  return { getAtomId };
}

