import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CustomProvider } from 'rsuite';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
  // gql
} from "@apollo/client";
import { STUDIO_SETTINGS } from "./settings";
import { Provider } from 'react-redux';
import {store} from "./state/store";


const client = new ApolloClient({
  uri: STUDIO_SETTINGS.CONNECTION_URL + "/graphql",
  cache: new InMemoryCache()
});
 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ApolloProvider client={client}>
      <CustomProvider theme='dark'>
        <App />
      </CustomProvider>
    </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
