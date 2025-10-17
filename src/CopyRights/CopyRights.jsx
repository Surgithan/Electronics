import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./CopyRights.css"; 

const CopyRights = () => {
    return (
        <div className="copyright-container">
            <div className="social-icons">
                <FaFacebook />
                <FaTwitter />
                <FaLinkedin />
                <FaInstagram />
            </div>
            <div className="copyright-text">
                <span>&copy; 2025. All Rights Reserved. Electronics.</span>
            </div>
        </div>
    );
};

export default CopyRights;
