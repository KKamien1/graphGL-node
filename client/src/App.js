
import React, { useState } from 'react'
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client';


console.log('REACT_APP_GRAPHQL_ENDOINT', process.env.REACT_APP_GRAPHQL_ENDOINT);

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDOINT,
  cache: new InMemoryCache()
})

const App = () => {

  const [posts, setPosts] = useState([]);
  client.query({
    query: gql`
    {
      allPosts {
        id
        title
        description
      }
    }
    `
  })
    .then(result => setPosts(result.data.allPosts))
    .catch(error => console.log(error));

  return (
    <div className="App">
      <div className="container p-5">

        {posts.map(post => {
          return (
            <div className="col-md-4" key={post.id}>
              <div className='card'>
                <div className="card-body">
                  <div className="card-title">
                    <h4>{post.title}</h4>
                  </div>
                  <p className="card-text">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
