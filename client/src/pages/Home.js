
import React from 'react'
import { useQuery, gql } from '@apollo/client';


const GET_ALL_POSTS = gql`
    {
      allPosts {
        id
        title
        description
      }
    }
 `


const Home = () => {

    const { data, loading, error } = useQuery(GET_ALL_POSTS)

    if (loading) return <p>Loading ...</p>


    return (
        <div className="App">
            <div className="container p-5">

                {data.allPosts.map(post => {
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

export default Home;
