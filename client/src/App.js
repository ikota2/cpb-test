import './App.css';
import { useEffect } from "react";

function App() {
    function fetchProducts() {
        fetch('http://localhost:3000/graphql', {
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
            .then(res => console.log(res.data));
    }

    useEffect(() => {
        fetchProducts();
    }, []);


  return (
    <div className="App">
      hello react
    </div>
  );
}

export default App;
