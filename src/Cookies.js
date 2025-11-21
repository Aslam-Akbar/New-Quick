import React from "react";

import "./assets/css/pages.css";

const Cookies = () => {
  return (
    <div className="page-container section-padding">

      <div className="container">
        <div className="page-header">
          <h1 className="section-title">Cookie Policy</h1>
          <p className="text-muted">Last Updated: November 20, 2025</p>
        </div>

        <div className="page-content">
          <section className="policy-section">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They allow the website to remember your actions and preferences (such as login, language, font size, 
              and other display preferences) over a period of time, so you don't have to keep re-entering them 
              whenever you come back to the site or browse from one page to another.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for several reasons:</p>
            <ul className="policy-list">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly.</li>
              <li><strong>Analytics Cookies:</strong> We use these to understand how visitors interact with our website.</li>
              <li><strong>Functional Cookies:</strong> These allow the website to remember choices you make.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Managing Cookies</h2>
            <p>
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your 
              computer and you can set most browsers to prevent them from being placed. If you do this, however, 
              you may have to manually adjust some preferences every time you visit a site and some services and 
              functionalities may not work.
            </p>
          </section>

          <section className="policy-section">
            <h2>4. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
              <br />
              <a href="mailto:privacy@quicktech.com" className="text-link">privacy@quicktech.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
