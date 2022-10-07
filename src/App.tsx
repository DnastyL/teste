import { ApolloProvider } from "@apollo/client";
import { HashRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import { client } from "./lib/apollo";
import { Router } from "./Router";

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
