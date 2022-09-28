import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import { client } from "./lib/apollo";
import { Router } from "./Router";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ContextProvider>
          <Router />
        </ContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
