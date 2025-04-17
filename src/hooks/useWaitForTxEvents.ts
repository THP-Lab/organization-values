import { getTransactionEventsQuery } from "@/backend/queries";
import { useApolloClient } from "@apollo/client";

export function useWaitForTxEvents() {
  const client = useApolloClient();

  const waitForTxEvents = async (hash, timeoutSeconds = 60) => {
    const promise = new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Transaction event polling timed out after ${timeoutSeconds} seconds`));
      }, timeoutSeconds * 1000);

      try {
        let attempts = 0;
        const maxAttempts = timeoutSeconds;

        while (attempts < maxAttempts) {
          attempts++;
          const { data, error } = await client.query({
            query: getTransactionEventsQuery,
            variables: { hash },
            fetchPolicy: "network-only",
          });
          
          if (data?.events.length > 0) {
            clearTimeout(timeoutId);
            return resolve(true);
          }
          
          if (error) {
            clearTimeout(timeoutId);
            return reject(error);
          }
          
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
    
    return promise;
  };

  return { waitForTxEvents };
}
