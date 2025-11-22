import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Terms = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-slate-400 text-lg">Last Updated: November 19, 2025</p>
          </div>
          
          <div className="space-y-8">
            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">1. Agreement to Terms</h2>
              <p className="text-slate-300 leading-relaxed">
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Quick Tech Solutions ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
              </p>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">2. Intellectual Property Rights</h2>
              <p className="text-slate-300 leading-relaxed">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">3. User Representations</h2>
              <p className="text-slate-300 leading-relaxed">
                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
              </p>
            </section>

            <section className="bg-slate-800/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">4. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                <br />
                <a href="mailto:legal@quicksolutions.com" className="text-blue-400 hover:text-blue-300 transition-colors underline mt-2 inline-block">
                  legal@quicksolutions.com
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

export default Terms;
