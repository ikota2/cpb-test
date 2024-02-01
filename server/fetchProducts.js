const fetch = require('node-fetch');
const NodeCache = require('node-cache');
require('dotenv').config();
const { SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN } = process.env;

const cache = new NodeCache({ stdTTL: 7200 });
const graphqlEndpoint = `https://${SHOPIFY_STORE_URL}/admin/api/2023-01/graphql.json`;

const fetchProducts = async () => {
    const cacheKey = 'products';
    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData;

    const query = `{
        products (first: 50) {
            edges {
                node {
                    id
                    bodyHtml
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
        const products = data.data.products.edges.map(edge => edge.node);

        cache.set(cacheKey, products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

module.exports = fetchProducts;
