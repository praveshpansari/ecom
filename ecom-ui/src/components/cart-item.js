import React, { useState } from "react";
import { deleteFromCart, getUserCart, updateCartItem } from "../api";
import "../styles/cart-item.css";
import useAuth from "../hooks/useAuth";

const CartItem = ({ item, setCart, setTotal }) => {
  const { authed } = useAuth();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdate = async (q) => {
    await updateCartItem(authed, {
      cart_item_id: item.id,
      quantity: q,
    });
    const data = await getUserCart(authed);
    if (data.status !== "fail") {
      setCart(data.items);
      setTotal(data.total);
    }
  };

  const increment = async () => {
    setQuantity(quantity + 1);
    await handleUpdate(quantity + 1);
  };

  const decrement = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      await handleUpdate(quantity - 1);
    }
  };

  const handleDelete = async () => {
    await deleteFromCart(authed, item.id);
    const data = await getUserCart(authed);
    if (data.status !== "fail") {
      setCart(data.items);
      setTotal(data.total);
    }
  };

  return (
    <div className="item">
      <div className="image">
        <img src={item.image} alt="" />
      </div>

      <div className="description">
        <span>{item.name}</span>
        <span>{item.brand}</span>
      </div>

      <div className="quantity">
        <button
          onClick={increment}
          className="plus-card-btn"
          type="button"
          name="button"
        >
          &#43;
        </button>
        <span className="input">{quantity}</span>
        <button
          disabled={item.quantity <= 1}
          onClick={decrement}
          className="minus-card-btn"
          type="button"
          name="button"
        >
          &#45;
        </button>
      </div>

      <div className="total-price">${item.quantity * item.price}</div>
      <div className="buttons">
        <span className="delete-card-btn" onClick={handleDelete}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default CartItem;
