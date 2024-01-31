const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

require('dotenv').config();
const { SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN } = process.env;

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String
  }

  type Query {
    getProducts: [Product]
  }
`);

const graphqlEndpoint = `https://${SHOPIFY_STORE_URL}/admin/api/2023-01/graphql.json`;
const root = {
    getProducts: async () => {
        const query = `{
          products(first: 3) {
            edges {
              node {
                id
                title
              }
            }
          }
        }`;

        try {
            const response = await fetch(graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
                },
                body: JSON.stringify({ query }),
            });
            const data = await response.json();
            console.log('appdata ', data);
            return data.data.products.edges.map(edge => edge.node);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
};

const index = express();
index.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const port = 3000;
index.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});
