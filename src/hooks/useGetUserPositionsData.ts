import { getUserPositions } from "@/backend/queries";
import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { formatEther } from "viem";

export function useGetUserPositionsData() {
  const client = useApolloClient();

  const getUserPositionsData = useCallback(
    async (address: string, batchSize = 100) => {
      const vaultPositions = [];
      const counterVaultPositions = [];
      let offset = 0;
      let hasMore = true;

      const where = {
        predicate_id: { _eq: process.env.NEXT_PUBLIC_PREDICATE_ID },
        subject_id: { _eq: process.env.NEXT_PUBLIC_SUBJECT_ID },
      };

      while (hasMore) {
        try {
          const { data } = await client.query({
            query: getUserPositions,
            variables: {
              address: address.toLowerCase(),
              where,
              limit: batchSize,
              offset,
            },
            fetchPolicy: "network-only",
          });

          if (!data || !data.triples || data.triples.length === 0) {
            hasMore = false;
            break;
          }


          for (const triple of data.triples) {
            if (
              triple.vault &&
              triple.vault.positions &&
              triple.vault.positions.length > 0 &&
              triple.vault.positions[0].shares > 0
            ) {
              vaultPositions.push({
                vaultId: triple.vault_id,
                tripleId: triple.id,
                shares: triple.vault.positions[0].shares,
                value: formatEther(
                  BigInt(triple.vault.positions[0].shares) *
                    BigInt(triple.vault.current_share_price) /
                    BigInt(10 ** 18)
                ),
              });
            }

            if (
              triple.counter_vault &&
              triple.counter_vault.positions &&
              triple.counter_vault.positions.length > 0 &&
              triple.counter_vault.positions[0].shares > 0
            ) {
              counterVaultPositions.push({
                vaultId: triple.counter_vault_id,
                tripleId: triple.id,
                shares: triple.counter_vault.positions[0].shares,
                value: formatEther(
                  BigInt(triple.counter_vault.positions[0].shares) *
                    BigInt(triple.counter_vault.current_share_price) /
                    BigInt(10 ** 18)
                ),
              });
            }
          }

          offset += batchSize;


          if (data.triples.length < batchSize) {
            hasMore = false;
          }
        } catch (error) {
          console.error("Error fetching user positions:", error);
          hasMore = false;
        }
      }

      return { vaultPositions, counterVaultPositions };
    },
    [client]
  );

  return { getUserPositionsData };
}
