import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetailsPage() {
  // The state variable `product` is currently an empty object {},
  // but you should use it to store the response from the Fake Store API (the product details).
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  // The `productId` coming from the URL parameter is available in the URL path.
  // You can access it with the `useParams` hook from react-router-dom.

  // To fetch the product details, set up an effect with the `useEffect` hook:
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      });
  }, [productId]);

  return (
    <div className="ProductDetailsPage">
      {/* Render product details here */}
      {!product && <h3>Sorry, product not found!</h3>}
      {product && (
        <div key={product._id}>
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.category}</p>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      )}
      <Link to="/" className="btn-primary">
        Back
      </Link>
    </div>
  );
}

export default ProductDetailsPage;
