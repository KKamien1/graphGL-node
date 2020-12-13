
import React from 'react'
import { Switch, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Home from './pages/Home'
import Register from './pages/auth/Register'
import CompleteRegistration from './pages/auth/CompleteRegistration'
import Login from './pages/auth/Login'
import Nav from './components/Nav'
import { ToastContainer } from 'react-toastify';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDOINT,
  cache: new InMemoryCache()
})

const App = () => {



  return (
    <ApolloProvider client={client}>
      <Nav />
      <Switch>

        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/complete-registration' component={CompleteRegistration} />
      </Switch>
      <ToastContainer></ToastContainer>
    </ApolloProvider>

  );
}

export default App;
