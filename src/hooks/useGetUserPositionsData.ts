import { useApolloClient, gql } from "@apollo/client";
import { useCallback } from "react";

const GET_TRIPLE_POSITIONS_BY_ADDRESS = gql`
  query GetTriplePositionsByAddress($address: String!, $predicate_id: String!, $subject_id: String!, $limit: Int, $offset: Int) {
    triples(where: { predicate_id: { _eq: $predicate_id }, subject_id: { _eq: $subject_id } }) {
      vault {
        positions {
          shares
        }
        current_share_price
      }
      counter_vault {
        positions {
          shares
        }
        current_share_price
      }
      vault_id
      counter_vault_id
    }
  }
`;

export function useGetUserPositions() {
  const client = useApolloClient();

  const getUserPositionsData = useCallback(
    async (address, batchSize = 100) => {
      if (!address || typeof address !== 'string' || address.trim() === '') {
        console.warn("Adresse invalide fournie à getUserPositionsData");
        return {
          address: '',
          vaultPositions: [],
          counterVaultPositions: []
        };
      }
  
      const vaultPositions = [];
      const counterVaultPositions = [];
      let offset = 0;
      let hasMore = true;
  
      while (hasMore) {
        const { data, error } = await client.query({
          query: GET_TRIPLE_POSITIONS_BY_ADDRESS,
          variables: {
            address: address.toLowerCase(),
            predicate_id: process.env.NEXT_PUBLIC_PREDICATE_ID,
            subject_id: process.env.NEXT_PUBLIC_SUBJECT_ID,
            limit: batchSize,
            offset,
          },
          fetchPolicy: "network-only",
        });
  
        if (error) {
          console.error("Error fetching positions:", error);
          throw error;
        }
  
        data.triples.forEach((triple) => {
        });
  
        if (data.triples.length < batchSize) {
          hasMore = false;
        } else {
          offset += batchSize;
        }
      }
  
      return {
        address: address.toLowerCase(),
        vaultPositions,
        counterVaultPositions,
      };
    },
    [client]
  );

  return { getUserPositionsData };
}
