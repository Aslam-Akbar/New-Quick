import React from "react";

// import "./assets/css/style.css"; // Removed

const About = () => {
  return (
    <div className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 block">Who We Are</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">About Quick Tech Solutions</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            We are a team of passionate technologists dedicated to building the future of digital innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                At Quick Tech Solutions, our mission is to empower businesses with cutting-edge technology that drives growth and efficiency. 
                We believe in the power of software to transform industries and improve lives.
              </p>
              <p>
                Founded in 2020, we have quickly grown into a trusted partner for startups and enterprises alike. 
                Our team of expert developers, designers, and strategists work collaboratively to deliver exceptional results.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-bold text-blue-500 mb-2">50+</h3>
                <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">Projects Delivered</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-bold text-violet-500 mb-2">20+</h3>
                <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">Expert Team Members</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-bold text-emerald-500 mb-2">98%</h3>
                <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">Client Satisfaction</p>
              </div>
            </div>
          </div>
          
          <div className="relative max-w-lg mx-auto lg:max-w-none w-full aspect-[4/3]">
            <div className="absolute -top-5 -left-5 w-full h-full border-2 border-blue-500 rounded-2xl z-0 hidden md:block"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Team collaboration" 
              className="w-full h-full object-cover rounded-2xl relative z-10 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
