// Import necessary packages
require('dotenv').config();
const { SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN } = process.env;
const fetch = require('node-fetch');

const graphqlEndpoint = `https://${SHOPIFY_STORE_URL}/admin/api/2023-01/graphql.json`;

const query = `{
  products (first: 3) {
    edges {
      node {
        id
        title
      }
    }
  }
}`;

fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
})
    .then(response => response.json())
    .then(data => {
        // TODO
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => console.error('Error fetching products:', error));
