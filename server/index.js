const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fetchProducts = require('./fetchProducts');

const schema = buildSchema(`
    type Product {
        id: ID!
        title: String
    }

    type Query {
        getProducts: [Product]
    }
`);

const root = {
    getProducts: async () => {
        return await fetchProducts();
    }
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

const port = 3000;
app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});
