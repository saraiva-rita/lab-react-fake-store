import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductListPage() {
  // The state variable `products` is currently an empty array [],
  // but you should use it to store the response from the Fake Store API (the list of products).
  const [products, setProducts] = useState([]);

  // To fetch the list of products, set up an effect with the `useEffect` hook:
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((response) => {
      setProducts(response.data); //save the response data from the API in the component's state
      console.log(response.data);
    });
  }, []);

  return (
    <div className="ProductListPage">
      <div className="items container">
        {products.map((product) => {
          return (
            <div className="card" key={product._id}>
              <div className="card__img">
                <Link to={`/product/details/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                </Link>
              </div>
              <div className="card__info">
                <Link to={`/product/details/${product.id}`}>
                  <h2>{product.title}</h2>
                </Link>
                <p>{product.category}</p>
                {/* <p>{product.price}</p> */}
                {/* <p>{product.description}</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductListPage;
