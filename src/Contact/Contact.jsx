import React from 'react';
import "./Contact.css"; 

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="about-section">
        <h3>About Us</h3>
        <p className='para'>
          This React.js website enables users to search, browse, and order products effortlessly, offering a seamless shopping experience with intuitive navigation, real-time updates, secure checkout, and efficient product management features.
        </p>
      </div>

      <div className="contact-section">
        <h3>Contact Us</h3>
        <address>
          <p>Native at:</p>
          <span>16/88 B Sanal Street,</span><br/>
          <span>Ottayalvilai,</span><br/>
          <span>Kanyakumari - 629702</span>
          <p>Call us: <a href="tel:+919787305593" className='num'>9787305593</a></p>
        </address>
      </div>
    </div>
  );
};

export default Contact;
