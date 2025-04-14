import { gql } from "@apollo/client";

export const pinThingMutation = gql(/* GraphQL */ `
  mutation PinThing($thing: PinThingInput!) {
    pinThing(thing: $thing) {
      uri
    }
  }
`);
