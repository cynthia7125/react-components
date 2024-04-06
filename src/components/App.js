import Header from "./Header";
import React from "react";
import Speakers from "./Speakers";
import Layout from "./Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
        <AuthProvider initialLoggesInUser="Ronald">
          <Layout startingTheme={"light"}>
            <div>
              <Header />
              <Speakers />
            </div>
          </Layout>
        </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
