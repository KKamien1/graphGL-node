const { gql } = require('apollo-server-express');

const me = () => 'Kamykov';

module.exports = {
    Query: {
        me,
    }
}