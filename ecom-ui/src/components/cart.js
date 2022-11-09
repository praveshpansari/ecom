import React, { useEffect } from "react";
import { getUserCart } from "../api";
import CartItem from "./cart-item";
import useAuth from "../hooks/useAuth";

const Cart = ({ cart, total, setCart, setTotal }) => {
  const { authed } = useAuth();

  const getCart = async (authed) => {
    const data = await getUserCart(authed);
    setTotal(data.total);
    setCart(data.items);
  };

  useEffect(() => {
    getCart(authed);
  }, [authed]);

  return cart.length ? (
    <div className="shopping-cart">
      {/* Title */}
      <div className="title">Shopping Bag</div>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            setCart={setCart}
            setTotal={setTotal}
          />
        ))}
      </div>

      <div className="summary">
        Amount:
        <span className="price">${total}</span>
      </div>
    </div>
  ) : (
    <h4 style={{ marginTop: "10rem", textAlign: "center" }}>Cart is empty!</h4>
  );
};

export default Cart;
