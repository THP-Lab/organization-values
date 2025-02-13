import { getTransactionEventsQuery } from "@/backend/queries";
import { useApolloClient } from "@apollo/client";

export function useWaitForTxEvents() {
  const client = useApolloClient();

  const waitForTxEvents = async (hash) => {
    const promise = new Promise(async (resolve, reject) => {
      while (true) {
        const { data, error } = await client.query({
          query: getTransactionEventsQuery,
          variables: { hash },
          fetchPolicy: "network-only",
        });
        if (data?.events.length > 0) {
          return resolve(true);
        }
        if (error) {
          return reject(error);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    });
    return promise;
  };

  return { waitForTxEvents };
}
