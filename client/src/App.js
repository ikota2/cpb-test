import React, { useEffect, useState, Suspense } from 'react';
import StatusWrapper from './components/StatusWrapper';
import classes from './App.module.css';

const ProductCard = React.lazy(() => import('./components/ProductCard'));

function App() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState('idle');

    function fetchProducts() {
        setStatus('loading');
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `{
                      getProducts {
                          id, bodyHtml
                      }
                }`
            })
        })
            .then(res => res.json())
            .then(res => {
                const data = res.data.getProducts;
                setProducts(data);
                if (data.length === 0) setStatus('empty');
                if (data.length > 0) setStatus('success');
            })
            .catch(error => {
                console.error('Error is ', error);
                setStatus('error');
            });
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="App">
            <StatusWrapper status={status}>
                <div className={classes.products}>
                    {products.length > 0 && products.map(({ id, bodyHtml }) => (
                        <Suspense fallback={<h4>Loading..</h4>}>
                            <ProductCard
                                key={id}
                                properties={{ id, bodyHtml }}
                            />
                        </Suspense>
                    ))}
                </div>
            </StatusWrapper>
        </div>
    );
}

export default App;
