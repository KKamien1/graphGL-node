const { gql } = require('apollo-server-express');
const posts = require('../temp')


const totalPosts = () => 42;
const allPosts = () => posts;

// mutation
const newPost = (parent, args) => {
    // create a new post object
    console.log(args);
    const { title, description } = args.input;
    const post = {
        id: posts.length + 1,
        title,
        description,
    }

    posts.push(post);
    return post;

}

module.exports = {
    Query: {
        totalPosts,
        allPosts,
    },
    Mutation: {
        newPost,
    }
}