import React from "react";

import "./assets/css/pages.css";

const Support = () => {
  return (
    <div className="page-container section-padding">

      <div className="container">
        <div className="page-header">
          <h1 className="section-title">SLA & Support</h1>
          <p className="text-muted">Dedicated support for our enterprise partners.</p>
        </div>

        <div className="page-content">
          <section className="policy-section">
            <h2>1. Service Level Agreement (SLA)</h2>
            <p>
              Our Standard SLA guarantees 99.9% uptime for all hosted services. We are committed to providing 
              reliable and performant solutions.
            </p>
            <div className="sla-tiers">
                <div className="sla-tier">
                    <h3>Standard Support</h3>
                    <p>Response time: 24 hours</p>
                    <p>Availability: Mon-Fri, 9am-5pm EST</p>
                </div>
                <div className="sla-tier">
                    <h3>Premium Support</h3>
                    <p>Response time: 4 hours</p>
                    <p>Availability: 24/7</p>
                </div>
            </div>
          </section>

          <section className="policy-section">
            <h2>2. Support Channels</h2>
            <p>Clients can reach our support team through the following channels:</p>
            <ul className="policy-list">
              <li><strong>Support Portal:</strong> <a href="https://portal.quicktech.com" className="text-link" target="_blank" rel="noopener noreferrer">portal.quicktech.com</a> (Client Login Required)</li>
              <li><strong>Email:</strong> <a href="mailto:support@quicktech.com" className="text-link">support@quicktech.com</a></li>
              <li><strong>Emergency Hotline:</strong> Provided in your contract for P1 incidents.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Issue Escalation</h2>
            <p>
              If you are not satisfied with the resolution of your issue, you may escalate it to your dedicated 
              Account Manager or our Support Director.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Support;
