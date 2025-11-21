import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Cookies = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-slate-400 text-lg">Last Updated: November 20, 2025</p>
          </div>

          <div className="space-y-8">
            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">1. What Are Cookies?</h2>
              <p className="text-slate-300 leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                They allow the website to remember your actions and preferences (such as login, language, font size, 
                and other display preferences) over a period of time, so you don't have to keep re-entering them 
                whenever you come back to the site or browse from one page to another.
              </p>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">2. How We Use Cookies</h2>
              <p className="text-slate-300 leading-relaxed mb-4">We use cookies for several reasons:</p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">Essential Cookies:</strong> These are necessary for the website to function properly.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">Analytics Cookies:</strong> We use these to understand how visitors interact with our website.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong className="text-white">Functional Cookies:</strong> These allow the website to remember choices you make.</span>
                </li>
              </ul>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">3. Managing Cookies</h2>
              <p className="text-slate-300 leading-relaxed">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your 
                computer and you can set most browsers to prevent them from being placed. If you do this, however, 
                you may have to manually adjust some preferences every time you visit a site and some services and 
                functionalities may not work.
              </p>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">4. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have any questions about our use of cookies, please contact us at:
                <br />
                <a href="mailto:privacy@quicktech.com" className="text-blue-400 hover:text-blue-300 transition-colors underline mt-2 inline-block">
                  privacy@quicktech.com
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

export default Cookies;
