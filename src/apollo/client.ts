
import { ApolloClient, createHttpLink, GraphQLRequest } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache, currentUserVar } from "./cache";

const httpLink = createHttpLink({
  uri: "https://web-wallet-server.herokuapp.com/graphql",
});


// Authenticate using HTTP header
async function contextSetter(_: GraphQLRequest, { headers }: any) {

  // get the authentication token from local storage if it exists

  const token = await sessionStorage.getItem("UserToken");
  console.log(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
}

export const client = new ApolloClient({
  link: setContext(contextSetter).concat(httpLink),
  cache,
});