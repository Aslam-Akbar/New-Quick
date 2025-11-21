import React from "react";
// import "./assets/css/style.css"; // Removed

const Contact = () => {
  return (
    <div className="bg-slate-900 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Contact Us</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-10">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
              <p className="text-slate-400 leading-relaxed">123 Tech Street<br />Silicon Valley, CA 94025</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
              <p className="text-slate-400 leading-relaxed">hello@quicksolutions.com<br />support@quicksolutions.com</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <p className="text-slate-400 leading-relaxed">+1 (555) 123-4567<br />Mon-Fri, 9am-6pm PST</p>
            </div>
          </div>

          <form className="bg-slate-800/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea 
                  rows="4" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
