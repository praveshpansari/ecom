import "./App.css";
import cartImg from "./assets/shopping-cart.png";
import Products from "./components/products";
import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cart from "./components/cart";
import Login from "./components/login";
import Register from "./components/register";
import useAuth from "./hooks/useAuth";
import { getUserCart } from "./api";

const App = () => {
  const { authed, logout } = useAuth();
  const [cart, setCart] = React.useState([]);
  const [cartTotal, setCartTotal] = React.useState(0);
  const getCart = async (authed) => {
    const data = await getUserCart(authed);
    setCartTotal(data.total);
    setCart(data.items);
  };

  React.useEffect(() => {
    getCart(authed);
  }, [authed]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <span></span>
          <Link to="/" className="link">
            Lavish Look
          </Link>
          <div className="right-nav">
            <Link to="/cart" alt="Cart-link">
              <img alt="Cart" className="cart-icon" src={cartImg} />
            </Link>
            {!authed ? (
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
            ) : (
              <Link to="/">
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </Link>
            )}
          </div>
        </header>
        <Routes>
          <Route
            exact
            path="/"
            element={<Products cart={cart} setCart={setCart} />}
          ></Route>
          <Route
            exact
            path="/cart"
            element={
              !authed ? (
                <Navigate replace to="/login" />
              ) : (
                <Cart
                  cart={cart}
                  total={cartTotal}
                  setCart={setCart}
                  setTotal={setCartTotal}
                />
              )
            }
          ></Route>
          <Route
            exact
            path="/login"
            element={!authed ? <Login /> : <Navigate replace to="/" />}
          ></Route>
          <Route
            exact
            path="/register"
            element={!authed ? <Register /> : <Navigate replace to="/" />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
