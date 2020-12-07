
import React, { useContext } from 'react'
import { useQuery, useLazyQuery, gql } from '@apollo/client';

import { AuthContext, AuthProvider } from '../context/authContext';

import { useHistory } from "react-router-dom";


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
    const [fetchPosts, { data: posts, loading: spinner, error: err }] = useLazyQuery(GET_ALL_POSTS)

    const { state, dispatch } = useContext(AuthContext);

    let history = useHistory();

    const updateUserName = () => {
        dispatch({
            type: 'LOGGED_IN_USER',
            payload: "Kamykov"
        })
    }

    if (loading) return <p>Loading ...</p>


    return (
        <div className="App">
            <div className="container p-5">

                {data.allPosts.map(post => {
                    return (
                        <div className="col-md-4" key={post.id}>
                            <div className='card'>
                                <div className="card-body">
                                    <div className="card-title"> <h4>{post.title}</h4> </div>
                                    <p className="card-text"> {post.description} </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <button onClick={() => { fetchPosts() }} className="btn-btn-raised btn-primary">Fetch</button>
            </div>
            {JSON.stringify(posts)}
            <hr />
            {JSON.stringify(state.user)}
            {JSON.stringify(history)}
            <button className="btn btn-primary" onClick={updateUserName}>
                Change User name
            </button>
        </div>
    );
}

export default Home;
