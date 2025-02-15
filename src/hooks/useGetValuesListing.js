import { getTriplesWithMyPosition } from "@/backend/queries";
import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";

export function useGetValuesListing() {
  const client = useApolloClient();

  const getValuesData = useCallback(
    async (
      page = 1,
      pageSize = 5,
      sortBy = "upvotes",
      onlyVoted = false,
      address = null
    ) => {
      // Calculate offset for pagination
      const offset = (page - 1) * pageSize;

      // Build order by clause based on sortBy
      let orderBy = [];
      switch (sortBy) {
        case "upvotes":
          orderBy = [{ vault: { total_shares: "desc" } }];
          break;
        case "downvotes":
          orderBy = [{ counter_vault: { total_shares: "desc" } }];
          break;
        case "newest":
          orderBy = [{ id: "desc" }];
          break;
        case "oldest":
          orderBy = [{ id: "asc" }];
          break;
        default:
          orderBy = [{ vault: { total_shares: "desc" } }];
      }

      // Build where clause
      const where = {
        predicate_id: { _eq: process.env.NEXT_PUBLIC_PREDICATE_ID }, // has value
        subject_id: { _eq: process.env.NEXT_PUBLIC_SUBJECT_ID }, // Ethereum
      };

      // Add filter for user's positions if onlyVoted is true
      if (onlyVoted && address) {
        where._or = [
          {
            vault: {
              positions: {
                account_id: { _eq: address.toLowerCase() },
                shares: { _gt: 0 },
              },
            },
          },
          {
            counter_vault: {
              positions: {
                account_id: { _eq: address.toLowerCase() },
                shares: { _gt: 0 },
              },
            },
          },
        ];
      }

      const { data, error } = await client.query({
        query: getTriplesWithMyPosition,
        variables: {
          limit: pageSize,
          offset,
          orderBy,
          where,
          address: address ? address.toLowerCase() : "",
        },
        fetchPolicy: "network-only", // Disable caching
      });

      if (error) {
        throw error;
      }

      const values = data.triples.map((triple) => ({
        id: triple.id,
        vaultId: triple.vault_id,
        counterVaultId: triple.counter_vault_id,
        valueName: triple.object.value.thing.name,
        description: triple.object.value.thing.description,
        totalStaked:
          (triple.vault.total_shares || 0) +
          (triple.counter_vault.total_shares || 0),
        totalUsers:
          (triple.vault.position_count || 0) +
          (triple.counter_vault.position_count || 0),
      }));

      return {
        values,
        currentPage: page,
        totalPages: Math.ceil(data.total.aggregate.count / pageSize),
      };
    },
    [client]
  );

  return { getValuesData };
}
