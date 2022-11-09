import * as React from "react";
import { Navigate } from "react-router-dom";

const authContext = React.createContext();

const setToken = (token) => {
  if (token) localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const getAuth = () => {
  return (
    localStorage.getItem("token") !== undefined &&
    localStorage.getItem("token") !== null
  );
};

function useAuth() {
  const [authed, setAuthed] = React.useState(getAuth());

  return {
    authed,
    async login(credentials) {
      return fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "fail") throw new Error(data.message);
          setAuthed(true);
          setToken(data.auth_token);
        });
    },
    logout() {
      setAuthed(false);
      removeToken();
    },
    async register(user) {
      return fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "fail") throw new Error(data.message);
          setAuthed(true);
          setToken(data.auth_token);
        });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}

export function RequireAuth({ children }) {
  const { authed } = useAuth();
  return authed === true ? children : <Navigate to="/login" replace />;
}
