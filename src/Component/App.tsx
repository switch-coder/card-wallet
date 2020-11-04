import React, { useState } from "react";
import Router from "./Router";
import "../globalstyle.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/client";
import UserContext from "../Context/UserContext";

function App() {

  const [userContext, setUserContext] = useState("");
  return (
    <UserContext.Provider value={[userContext, setUserContext]} >
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </UserContext.Provider>);

}

export default App;
