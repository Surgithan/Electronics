import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import Nav from "../Component/Nav/Nav";
import CopyRights from "../CopyRights/CopyRights";
import Contact from "../Contact/Contact";

const Dashboard = () => {
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const orderData = JSON.parse(localStorage.getItem("orders")) || [];

        setWishlistCount(wishlist.length);
        setCartCount(cart.length);
        setOrders(orderData);

        const spent = orderData.reduce((sum, order) => sum + order.total, 0);
        setTotalSpent(spent);
    }, []);

    return (
        <div className="dashboard-page">
            <Nav />

            <div className="dashboard-content">
                <h2>My Activity Dashboard</h2>

                <div className="dashboard-cards">
                    <div className="dash-card wishlist">
                        <h3>Wishlist</h3>
                        <p>{wishlistCount} items</p>
                    </div>

                    <div className="dash-card cart">
                        <h3>Cart</h3>
                        <p>{cartCount} items</p>
                    </div>

                    <div className="dash-card orders">
                        <h3>Total Orders</h3>
                        <p>{orders.length}</p>
                    </div>

                    <div className="dash-card spent">
                        <h3>Total Spent</h3>
                        <p>₹{totalSpent.toLocaleString()}</p>
                    </div>
                </div>

                {orders.length > 0 && (
                    <div className="recent-orders">
                        <h3>Recent Orders</h3>
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(-5).reverse().map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.orderDate}</td>
                                        <td>{order.items.length}</td>
                                        <td>₹{order.total.toLocaleString()}</td>
                                        <td>{order.orderStatus[order.orderStatus.length - 1].step}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Contact />
            <CopyRights />
        </div>
    );
};

export default Dashboard;
