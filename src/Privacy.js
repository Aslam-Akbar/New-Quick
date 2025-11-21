import React from "react";

import "./assets/css/style.css";

const Privacy = () => {
  return (
    <div className="legal-page section-padding">

      <div className="container">
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="text-muted">Last Updated: November 19, 2025</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              Quick Tech Solutions ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul>
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>
          </section>

          <section>
            <h2>3. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            </ul>
          </section>

          <section>
            <h2>4. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@quicksolutions.com">privacy@quicksolutions.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
