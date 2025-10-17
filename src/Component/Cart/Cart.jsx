import React, { useState, useEffect } from "react";
import "./Cart.css";
import Nav from "../Nav/Nav";
import CopyRights from "../../CopyRights/CopyRights";
import Contact from "../../Contact/Contact";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [address, setAddress] = useState("");
    const [orderStatus, setOrderStatus] = useState([]);
    const [showOrderTracking, setShowOrderTracking] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const removeItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const totalAmount = cartItems.reduce((acc, item) => {
        const price = Number(item.rate.replace(/[^0-9]/g, ""));
        return acc + price;
    }, 0);

    const handleBuy = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        setShowAddress(true);
    };

    const handleConfirmOrder = () => {
        if (!address.trim()) {
            alert("Please enter your address!");
            return;
        }

        const currentTime = new Date();
        const dateTime = currentTime.toLocaleString();

        const orderSteps = [
            { step: "Order Packed", time: dateTime },
            { step: "Shipped", time: new Date(currentTime.getTime() + 2 * 60 * 60 * 1000).toLocaleString() },
            { step: "Delivered", time: new Date(currentTime.getTime() + 24 * 60 * 60 * 1000).toLocaleString() },
        ];

        const orderData = {
            items: cartItems,
            address: address,
            total: totalAmount - Math.floor(totalAmount * 0.1) + 50,
            orderStatus: orderSteps,
            orderDate: dateTime,
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        existingOrders.push(orderData);
        localStorage.setItem("orders", JSON.stringify(existingOrders));

        localStorage.removeItem("cart");
        setCartItems([]);
        setOrderStatus(orderSteps);
        setShowOrderTracking(true);
        setShowAddress(false);
    };


    return (
        <div className="cart-page">
            <Nav />

            <div className="cart-content">
                <h2>My Cart</h2>

                <div className="cart-list">
                    {cartItems.length === 0 && !showOrderTracking && (
                        <p className="empty-message">Your cart is empty.</p>
                    )}

                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.img} alt={item.name} className="pt-item-img" />
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <h6>{item.rate}</h6>
                            </div>
                            <button className="remove-btn" onClick={() => removeItem(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}

                    {cartItems.length > 0 && (
                        <div className="cart-summary">
                            <h3>Total: ₹{totalAmount.toLocaleString()}</h3>
                            <p>Offer: -₹{Math.floor(totalAmount * 0.1).toLocaleString()}</p>
                            <p>Delivery: ₹{cartItems.length > 0 ? 50 : 0}</p>
                            <h3>
                                Payable: ₹{(totalAmount - Math.floor(totalAmount * 0.1) + 50).toLocaleString()}
                            </h3>
                            <button className="buy-btn" onClick={() => setShowAddress(true)}>
                                Place Order
                            </button>
                        </div>
                    )}
                </div>

                {showAddress && (
                    <div className="modal-overlay">
                        <div className="address-section">
                            <h3>Enter Delivery Address</h3>
                            <input
                                type="text"
                                placeholder="Search your address with Google..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="address-input"
                            />
                            <div className="address-btns">
                                <button className="confirm-btn" onClick={handleConfirmOrder}>
                                    Confirm Order
                                </button>
                                <button className="cancel-btn" onClick={() => setShowAddress(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Contact />
            <CopyRights />
        </div>
    );
};

export default Cart;
