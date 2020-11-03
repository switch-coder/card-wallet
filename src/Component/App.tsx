import React from "react";
import Router from "./Router";
import "../globalstyle.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/client";
import { UserProvider } from "../Context/UserContext";

function App() {
  console.log("app")
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </UserProvider>);

}

export default App;
