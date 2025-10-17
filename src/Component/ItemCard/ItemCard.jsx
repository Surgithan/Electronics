import React, { useState, useEffect } from "react";
import "./ItemCard.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const ItemCard = ({ updateCartCount, items }) => {
    const [likedItems, setLikedItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setLikedItems(storedWishlist);
        setCartItems(storedCart);
        if (updateCartCount) updateCartCount(storedCart.length);
    }, [updateCartCount]);

    const toggleHeart = (item) => {
        const updated = likedItems.find((i) => i.id === item.id)
            ? likedItems.filter((i) => i.id !== item.id)
            : [...likedItems, item];

        setLikedItems(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    const addToCart = (item) => {
        if (!cartItems.find((i) => i.id === item.id)) {
            const updatedCart = [...cartItems, item];
            setCartItems(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            if (updateCartCount) updateCartCount(updatedCart.length);
        }
    };

    return (
        <div className="item-container">
            {items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                items.map((item) => {
                    const isLiked = likedItems.find((i) => i.id === item.id);
                    return (
                        <div className="item-card" key={item.id}>
                            <div className="heart-icon" onClick={() => toggleHeart(item)}>
                                {isLiked ? <FaHeart size={20} color="red" /> : <FaRegHeart size={20} color="gray" />}
                            </div>
                            <img src={item.img} alt={item.name} className="item-img" />
                            <h6>{item.name}</h6>
                            <h3>{item.rate}</h3>
                            <button className="add-btn" onClick={() => addToCart(item)}>
                                Add to Cart
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ItemCard;
