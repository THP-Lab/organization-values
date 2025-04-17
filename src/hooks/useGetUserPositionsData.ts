import { getUserPositions } from "@/backend/queries";
import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

export function useGetUserPositions() {
  const client = useApolloClient();

  const getUserPositionsData = useCallback(
    async (address, batchSize = 100) => {
      const vaultPositions = [];
      const counterVaultPositions = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await client.query({
          query: getUserPositions,
          variables: {
            where: {
              predicate_id: { _eq: process.env.NEXT_PUBLIC_PREDICATE_ID }, // has value
              subject_id: { _eq: process.env.NEXT_PUBLIC_SUBJECT_ID }, // Organization ID
            },
            address: address.toLowerCase(),
            limit: batchSize,
            offset,
          },
          fetchPolicy: "network-only", // Disable caching
        });

        if (error) {
          throw error;
        }

        data.triples.forEach((triple) => {
          // Check for positions in the vault
          if (triple.vault.positions && triple.vault.positions.length > 0) {
            vaultPositions.push({
              vaultId: triple.vault_id,
              shares: triple.vault.positions[0].shares,
              assets:
                BigInt(triple.vault.positions[0].shares) *
                BigInt(triple.vault.current_share_price) /
                BigInt(10 ** 18),
            });
          }

          // Check for positions in the counter vault
          if (
            triple.counter_vault.positions &&
            triple.counter_vault.positions.length > 0
          ) {
            counterVaultPositions.push({
              vaultId: triple.counter_vault_id,
              shares: triple.counter_vault.positions[0].shares,
              assets:
                BigInt(triple.counter_vault.positions[0].shares) *
                BigInt(triple.counter_vault.current_share_price) /
                BigInt(10 ** 18),
            });
          }
        });

        // Check if we need to fetch more data
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
