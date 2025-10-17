import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useParams } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { FaJediOrder, FaRegHeart, FaHeart } from "react-icons/fa";
import ItemCard from "../ItemCard/ItemCard";
import CopyRights from "../../CopyRights/CopyRights";
import Contact from "../../Contact/Contact";
import Json from "../../assests/Json/Cards";

const Navbar = () => {
    const { username } = useParams();
    const [wishlist, setWishlist] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(stored);
    }, []);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(storedCart.length);
    }, []);

    const hasItems = wishlist.length > 0;

    const filteredItems = Json.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <nav className="navbar-container">
                <div className="nav-header">
                    <Link to={`/${username}/dashboard`}>
                        <h2>Electronics</h2>
                    </Link>
                </div>

                <div className="middle-search">
                    <input
                        type="search"
                        placeholder="Search Items"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="middle-list">
                    <Link to={`/${username}/my-orders`} className="wishlist-link">
                        <FaJediOrder /> My Orders
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

            <ItemCard updateCartCount={setCartCount} items={filteredItems} />
            <Contact />
            <CopyRights />
        </>
    );
};

export default Navbar;
