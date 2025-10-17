import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./Order.css";
import CopyRights from "../../CopyRights/CopyRights";
import Contact from "../../Contact/Contact";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <>
      
        <Nav />

      <div className="order-container">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p className="empty-message">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-card" key={index}>
              <h3>Order No:{index + 1}</h3>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
              <p>
                <strong>Order Date:</strong> {order.orderDate}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>

              <h4>Items:</h4>
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div className="order-item" key={i}>
                    <div className="order-item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-rate">{item.rate}</p>
                    </div>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="order-item-img"
                    />
                  </div>
                ))}
              </div>

              <h4>Status:</h4>
              <ul className="status-list">
                {order.orderStatus.map((status, i) => (
                  <li key={i}>
                    <span className="step">{status.step}</span> {" "}
                    <span className="time">{status.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <Contact/>
      <CopyRights/>
    </>
  );
};

export default Order;
