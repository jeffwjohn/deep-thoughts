import React from 'react';

// add these two library import statements
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
// So we just imported two key pieces to the application. The first, ApolloProvider, is a special type of React component that we'll use to provide data to all of the other components. We'll use the second, ApolloClient, to get that data when we're ready to use it.

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

const client = new ApolloClient({
  uri: '/graphql'
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
