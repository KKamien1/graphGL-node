
import React, { useState } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';

import Home from './pages/Home'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDOINT,
  cache: new InMemoryCache()
})

const App = () => {



  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>

  );
}

export default App;
