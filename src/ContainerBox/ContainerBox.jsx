import React, { useState, useEffect } from "react";
import "./ContainerBox.css";
import Login from "../Logins/Login";
import Content from "../Logins/Content";

const ContainerBox = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  return (
    <>

      <div className="main-container">
        <div className="side-container">
          <Login />
        </div>
        <div className="right-container">
          <Content user={user} setUser={setUser} />

        </div>
      </div>
    </>
  );
};

export default ContainerBox;
