import { gql } from "@apollo/client";

export const getTriplesWithMyPosition = gql(/* GraphQL */ `
  query GetTriplesWithPositions(
    $limit: Int
    $offset: Int
    $orderBy: [triples_order_by!]
    $where: triples_bool_exp
    $address: String
  ) {
    total: triples_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    triples(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      id
      vault_id
      counter_vault_id
      subject {
        id
        vault_id
        label
        image
      }
      predicate {
        id
        vault_id
        label
        image
      }
      object {
        id
        vault_id
        label
        image
        value {
          thing {
            name
            image
            description
            url
          }
        }
      }
      vault {
        total_shares
        position_count
        positions(where: { account_id: { _eq: $address } }) {
          account {
            id
            label
            image
          }
          shares
        }
      }
      counter_vault {
        total_shares
        position_count
        positions(where: { account_id: { _eq: $address } }) {
          account {
            id
            label
            image
          }
          shares
        }
      }
    }
  }
`);

export const getUserPositions = gql(/* GraphQL */ `
  query GetUserPositions(
    $where: triples_bool_exp
    $address: String!
    $limit: Int
    $offset: Int
  ) {
    triples(where: $where, limit: $limit, offset: $offset) {
      id
      vault_id
      counter_vault_id
      vault {
        positions(where: { account_id: { _eq: $address } }) {
          shares
        }
      }
      counter_vault {
        positions(where: { account_id: { _eq: $address } }) {
          shares
        }
      }
    }
  }
`);

export const getTransactionEventsQuery = gql(/* GraphQL */ `
  query GetTransactionEvents($hash: String!) {
    events(where: { transaction_hash: { _eq: $hash } }) {
      transaction_hash
    }
  }
`);

export const getAtomIDsByUriQuery = gql(/* GraphQL */ `
  query SearchAtomsByUri($uri: String) {
    atoms(where: { data: { _eq: $uri } }) {
      id
    }
  }
`);
