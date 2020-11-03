import { InMemoryCache, makeVar, gql } from "@apollo/client";
import { IUser } from "./interfaces";


export const currentUserVar = makeVar<IUser | null>(null);

// Local queries
export const GET_CURRENT_USER = gql`
  query {
    user{
      name
      ID
      token
      cards{
        id
        name
        store
        img
        cardNumber  
        bgColor
        color
      }
    }
      
  }
`;

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user() {
          return currentUserVar();
        },
      },
    },
  },
});

