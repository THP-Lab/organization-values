import { useApolloClient } from "@apollo/client";
import { getTransactionEventsQuery } from "@/backend/queries";
import { useCallback } from "react";

export function useWaitForTxEvents() {
  const client = useApolloClient();

  const waitForTxEvents = async (hash: string) => {
    const promise = new Promise(async (resolve, reject) => {
      while (true) {
        try {
          const { data, error } = await client.query({
            query: getTransactionEventsQuery,
            variables: { hash },
            fetchPolicy: "network-only",
          });

          if (error) {
            reject(error);
            break;
          }

          if (
            data &&
            data.events &&
            data.events.length > 0
          ) {
            resolve(data.events);
            break;
          }

          await new Promise((r) => setTimeout(r, 2000));
        } catch (err) {
          reject(err);
          break;
        }
      }
    });

    return promise;
  };

  const memoizedWaitForTxEvents = useCallback(waitForTxEvents, [client]);

  return { waitForTxEvents: memoizedWaitForTxEvents };
}
