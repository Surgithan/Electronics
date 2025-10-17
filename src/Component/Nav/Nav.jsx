import React, { useState, useEffect } from "react";
import "../Navbar/Navbar.css"
import { Link, useParams } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { FaJediOrder } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Navbar = () => {
    const { username } = useParams();
    const [wishlist, setWishlist] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(stored);
        const handleStorage = () => {
            const updated = JSON.parse(localStorage.getItem("wishlist")) || [];
            setWishlist(updated);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(storedCart.length);
    }, []);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(storedCart.length);
    }, []);

    const hasItems = wishlist.length > 0;

    return (
        <>
            <div>

                <nav className="navbar-container">

                    <Link to={`/${username}/dashboard`}>
                        <h2>Electronics</h2>
                    </Link>

                    <div className="middle-list">
                        <Link to={`/${username}/my-orders`} className="wishlist-link">
                            <FaJediOrder />
                            My Orders
                        </Link>
                    </div>
                    <div className="middle-list">
                        <Link to={`/${username}/wishlist`} className="wishlist-link">
                            {hasItems ? <FaHeart size={20} color="red" /> : <FaRegHeart size={20} color="gray" />}
                            Wishlist
                        </Link>

                    </div>

                    <div className="nav-cart">
                        <Link to={`/${username}/cart`} className="cart-link">
                            <GiShoppingCart size={30} color="#fff" />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                    </div>

                </nav>

            </div>
        </>

    );
};

export default Navbar;
