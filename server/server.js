const express = require('express')
require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const { makeExecutableSchema } = require("graphql-tools")
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")
const { loadFilesSync } = require("@graphql-tools/load-files");
const mongoose = require('mongoose');


const app = express()

const db = async () => {
    try {
        const success = await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifieldTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB connected');

    } catch (error) {
        console.log(error);
    }
}
db();

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs")));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, "./resolvers")));

// graphQL server

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
})


// applyMiddleware method connects ApolloServer to a specific HTTP framework 
apolloServer.applyMiddleware({
    app
})


// server
const httpserver = http.createServer(app)

app.get('/rest', (req, res) => {
    res.json({ data: 'you hi a endpoint' })
})

app.listen(process.env.PORT, () => {
    console.log(`Server at port: ${process.env.PORT}`);
    console.log(`GraphQl server is ready at http://localhost ${process.env.PORT}${apolloServer.graphqlPath}`);
})