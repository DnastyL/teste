import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { TimeLineContextProvider } from "./context/TimeLine";
import { client } from "./lib/apollo";
import { Router } from "./Router";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <TimeLineContextProvider>
          <Router />
        </TimeLineContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
