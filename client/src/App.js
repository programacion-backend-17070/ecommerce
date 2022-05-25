import { useEffect, useState } from "react";
import axios from "axios"

function App() {
  const [products, setProducts] = useState([])

  const getProducts = () => {
    console.log('getProducts')
    // return [{ name: 1 }]
    axios.get("http://localhost:8080/api/products")
      .then(({ data }) => setProducts(data))
    
  }

  useEffect(getProducts, [])

  return (
    <div className="App">
      {products.map((c, id)=> <p key={id}>{c.name}</p>)}
    </div>
  );
}

export default App;
