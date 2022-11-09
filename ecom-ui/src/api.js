const API_URI = "http://127.0.0.1:5000/";

export const getAllProducts = async () => {
  const response = await fetch(`${API_URI}products`);
  const data = await response.json();
  return data;
};

export const getAllBrands = async () => {
  const response = await fetch(`${API_URI}brands`);
  const data = await response.json();
  return data;
};

export const getUserCart = async (auth) => {
  if (auth && localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URI}cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } else return new Error("User not logged in");
};

export const addToCart = async (auth, payload) => {
  if (auth && localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URI}cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } else return new Error("User not logged in");
};

export const updateCartItem = async (auth, payload) => {
  if (auth && localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URI}cart?cart_item_id=${payload.cart_item_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ quantity: payload.quantity }),
      }
    );
    const data = await response.json();
    return data;
  } else return new Error("User not logged in");
};

export const deleteFromCart = async (auth, cart_item_id) => {
  if (auth && localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URI}cart?cart_item_id=${cart_item_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const data = await response.json();
    return data;
  } else return new Error("User not logged in");
};
