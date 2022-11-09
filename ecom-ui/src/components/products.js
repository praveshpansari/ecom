import React, { useEffect, useState } from "react";
import { getAllBrands, getAllProducts } from "../api";
import ProductCard from "./product-card";
import useAuth from "../hooks/useAuth";

const Product = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const { authed } = useAuth();

  const getProducts = async () => {
    const data = await getAllProducts();
    setProducts(data.products);
    const prices = data.products.map((p) => p.price);
    let minPrice = Math.ceil(Math.min(...prices));
    let maxPrice = Math.ceil(Math.max(...prices));
    setPrice({
      maxPrice: maxPrice,
      minPrice: minPrice,
      currentPrice: maxPrice,
    });
  };

  const getBrands = async () => {
    const data = await getAllBrands();
    setBrands(data.brands);
  };

  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [price, setPrice] = useState({
    maxPrice: 0,
    minPrice: 0,
    currentPrice: 0,
  });

  const [brand, setBrand] = useState("0");

  useEffect(() => {
    getProducts();
    getBrands();
  }, []);

  return products.length ? (
    <div className="container">
      <div className="filters">
        <span></span>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value.toLowerCase())}
          className="search-box"
          placeholder="Search for products..."
        />
        <div className="filter-options">
          <button onClick={() => setToggle(!toggle)} className="drop-btn">
            Filter
          </button>
          <div className={`box ${toggle ? "active" : ""}`}>
            <label htmlFor="brand">Brand:</label>
            <select
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="0">All</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className="slider">
              <input
                type="range"
                min={price.minPrice}
                max={price.maxPrice}
                value={price.currentPrice}
                onChange={(e) =>
                  setPrice({ ...price, currentPrice: e.target.value })
                }
              />
              <p>${price.currentPrice}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="products">
        {products
          .filter(
            (product) =>
              (product.name.toLowerCase().includes(search) ||
                product.brand.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search)) &&
              product.price <= price.currentPrice &&
              (brand === "0" || product.brand === brand)
          )
          .map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                inCart={
                  authed &&
                  cart &&
                  cart.find((cart) => cart.product_id === product.id) !==
                    undefined
                }
                setCart={setCart}
                cart={cart}
              />
            );
          })}
      </div>
    </div>
  ) : (
    <div>No products found</div>
  );
};

export default Product;
