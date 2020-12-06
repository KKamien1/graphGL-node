const { ApolloServer } = require('apollo-server');
require('dotenv').config();


// graphql server
// types query / mutation / subscription
// resolvers

const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`

const resolvers = {
    Query: {
        totalPosts: () => 42
    }
}

// graphQL server

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
})

// port
apolloServer.listen(process.env.PORT, function () {
    console.log(`graphql server is ready at: http://localhost:${process.env.PORT}`);
});