import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const cartId = 1; // Replace with the actual ID of the cart

    // Fetch the cart details first
    axios
      .get(`https://fakestoreapi.com/carts/${cartId}`)
      .then((cartResponse) => {
        // Extract product IDs from the cart details
        const productIds = cartResponse.data.products.map(
          (product) => product.id
        );

        // Fetch product details using the product IDs
        axios
          .get('https://fakestoreapi.com/products')
          .then((productsResponse) => {
            // Filter products that are in the cart
            const productsInCart = productsResponse.data.filter((product) =>
              productIds.includes(product.id)
            );

            setCart(productsInCart);
            setFetching(false);
          });
      });
  }, []);

  return (
    <div className="CartPage">
      <h2>Your Shopping Cart</h2>
      {fetching ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.category}</p>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default CartPage;
