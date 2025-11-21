import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Privacy = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-slate-400 text-lg">Last Updated: November 19, 2025</p>
          </div>
          
          <div className="space-y-8">
            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">1. Introduction</h2>
              <p className="text-slate-300 leading-relaxed">
                Quick Tech Solutions ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">2. Information We Collect</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</span>
                </li>
              </ul>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">3. Use of Your Information</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Create and manage your account.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Email you regarding your account or order.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</span>
                </li>
              </ul>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">4. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:privacy@quicksolutions.com" className="text-blue-400 hover:text-blue-300 transition-colors underline mt-2 inline-block">
                  privacy@quicksolutions.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
