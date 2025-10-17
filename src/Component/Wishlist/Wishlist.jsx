import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import { FaHeart } from "react-icons/fa";
import CopyRights from "../../CopyRights/CopyRights";
import "./Wishlist.css";
import Contact from "../../Contact/Contact";

const Wishlist = ({ updateCartCount }) => {
    const [wishlist, setWishlist] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(stored);
    }, []);

    const toggleHeart = (item) => {
        const updated = wishlist.filter((i) => i.id !== item.id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    const addToCart = (item) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!storedCart.find((i) => i.id === item.id)) {
            const updatedCart = [...storedCart, item];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            if (updateCartCount) updateCartCount(updatedCart.length);
            setMessage(`${item.name} added to cart!`);
            setTimeout(() => setMessage(""), 2000);
        }
    };

    return (
        <div className="wishlist-page">
            <Nav />
            {message && (
                <div className="cart-message">
                    {message}
                </div>
            )}

            <div className="wishlist-content">
                {wishlist.length === 0 ? (
                    <p className="empty-message">No items in wishlist.</p>
                ) : (
                    <div className="item-container">
                        {wishlist.map((item, index) => (
                            <div className="wl-card" key={index}>
                                <img src={item.img} alt={item.name} className="wl-img" />

                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <h6>{item.rate}</h6>
                                </div>

                                <div className="wl-actions">
                                    <div className="heart-icon" onClick={() => toggleHeart(item)}>
                                        <FaHeart size={20} color="red" />
                                    </div>
                                    <button className="add-btn" onClick={() => addToCart(item)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <Contact/>
                <CopyRights />
            </div>

        </div>
    );
};

export default Wishlist;
