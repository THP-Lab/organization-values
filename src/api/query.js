import { gql } from "generated/gql";

export const getTriplesWithMyPosition = gql(/* GraphQL */ `
  query GetTriplesWithMyPosition(
    $predicateId: numeric!
    $subjectId: numeric!
    $address: String
  ) {
    triples(
      where: {
        predicate_id: { _eq: $predicateId }
        subject_id: { _eq: $subjectId }
      }
      order_by: [
        {
          vault: { position_count: desc }
          counter_vault: { position_count: desc }
        }
      ]
    ) {
      id
      object {
        label
        value {
          thing {
            name
            description
          }
        }
      }
      vault {
        id
        position_count
        positions(limit: 10, where: { account_id: { _neq: $address } }) {
          account_id
          account {
            image
            label
          }
        }
        myPosition: positions(
          limit: 1
          where: { account_id: { _eq: $address } }
        ) {
          shares
          account_id
          account {
            image
            label
          }
        }
      }
      counter_vault {
        id
        position_count
        positions(limit: 10, where: { account_id: { _neq: $address } }) {
          account_id
          account {
            image
            label
          }
        }
        myPosition: positions(
          limit: 1
          where: { account_id: { _eq: $address } }
        ) {
          shares
          account_id
          account {
            image
            label
          }
        }
      }
    }
  }
`);
