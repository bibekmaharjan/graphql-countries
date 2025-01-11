import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
      countries {
        name
      }
    }
  }
`;

export const GET_CONTINENT_DATA = gql`
  query GetContinentData($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
        phone
        currency
        emoji
        languages {
          code
          name
          native
        }
      }
    }
  }
`;
