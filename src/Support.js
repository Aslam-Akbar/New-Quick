import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Support = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">SLA & Support</h1>
            <p className="text-slate-400 text-lg">Dedicated support for our enterprise partners.</p>
          </div>

          <div className="space-y-8">
            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">1. Service Level Agreement (SLA)</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Our Standard SLA guarantees 99.9% uptime for all hosted services. We are committed to providing 
                reliable and performant solutions.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-white/10 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Standard Support</h3>
                  <p className="text-slate-300 mb-2">Response time: 24 hours</p>
                  <p className="text-slate-300">Availability: Mon-Fri, 9am-5pm EST</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-blue-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Premium Support</h3>
                  <p className="text-slate-300 mb-2">Response time: 4 hours</p>
                  <p className="text-slate-300">Availability: 24/7</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">2. Support Channels</h2>
              <p className="text-slate-300 leading-relaxed mb-4">Clients can reach our support team through the following channels:</p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    <strong className="text-white">Support Portal:</strong>{" "}
                    <a href="https://portal.quicktech.com" className="text-blue-400 hover:text-blue-300 transition-colors underline" target="_blank" rel="noopener noreferrer">
                      portal.quicktech.com
                    </a>{" "}
                    (Client Login Required)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    <strong className="text-white">Email:</strong>{" "}
                    <a href="mailto:support@quicktech.com" className="text-blue-400 hover:text-blue-300 transition-colors underline">
                      support@quicktech.com
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">Emergency Hotline:</strong> Provided in your contract for P1 incidents.</span>
                </li>
              </ul>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">3. Issue Escalation</h2>
              <p className="text-slate-300 leading-relaxed">
                If you are not satisfied with the resolution of your issue, you may escalate it to your dedicated 
                Account Manager or our Support Director.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Support;
