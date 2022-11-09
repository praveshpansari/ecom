import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../api";
import useAuth from "../hooks/useAuth";
import cartImg from "../assets/shopping-cart.png";

const ProductCard = ({ product, inCart, setCart, cart }) => {
  const { authed } = useAuth();

  const handleClick = async (e) => {
    const data = await addToCart(authed, {
      product_id: product.id,
      quantity: 1,
    });
    if (data.status !== "fail") {
      inCart = true;
      setCart([...cart, data.item]);
    }
  };

  return (
    <div className="card">
      {inCart ? (
        <button className="incart">
          <img src={cartImg} alt="Already in cart" />
        </button>
      ) : (
        ""
      )}
      <img src={product.image} className="card-img" alt={product.name} />
      <p className="card-description">{product.description}</p>

      <div className="card-info">
        <h3 className="card-title">{product.name}</h3>
        <div className="card-brand">{product.brand}</div>
      </div>

      <div className="card-actions">
        ${product.price}
        {!authed ? (
          <Link to="/login">
            <button className="cart-button">Add to Cart</button>
          </Link>
        ) : !inCart ? (
          <button onClick={handleClick} className="cart-button">
            Add to Cart
          </button>
        ) : (
          <Link to="/cart">
            <button className="cart-button">Go to Cart</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
