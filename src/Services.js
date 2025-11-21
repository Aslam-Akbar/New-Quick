import React from "react";
import Link from "next/link";
import { FaLaptopCode, FaMobileAlt, FaCloud, FaChartLine, FaShieldAlt, FaBrain } from "react-icons/fa";
// import "./assets/css/pages.css"; // Removed

const Services = () => {
  const services = [
    {
      icon: <FaLaptopCode />,
      title: "Custom Software Development",
      desc: "We build robust, scalable, and secure software solutions tailored to your unique business needs. From complex ERPs to intuitive SaaS platforms.",
      features: ["Microservices Architecture", "API Integration", "Legacy Modernization"]
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile App Development",
      desc: "Native and cross-platform mobile applications that deliver seamless user experiences on iOS and Android devices.",
      features: ["React Native & Flutter", "iOS & Android Native", "App Store Optimization"]
    },
    {
      icon: <FaCloud />,
      title: "Cloud Infrastructure",
      desc: "Secure and scalable cloud solutions. We help you migrate, optimize, and manage your infrastructure on AWS, Azure, or Google Cloud.",
      features: ["DevOps Automation", "Serverless Computing", "Cloud Security"]
    },
    {
      icon: <FaChartLine />,
      title: "Growth & Analytics",
      desc: "Data-driven strategies to grow your user base and optimize conversion rates. We turn data into actionable insights.",
      features: ["SEO & ASO", "Conversion Rate Optimization", "Business Intelligence"]
    },
    {
      icon: <FaShieldAlt />,
      title: "Cybersecurity Services",
      desc: "Protect your digital assets with our comprehensive security audits, penetration testing, and compliance consulting.",
      features: ["Vulnerability Assessment", "Compliance (GDPR/HIPAA)", "Secure Coding Practices"]
    },
    {
      icon: <FaBrain />,
      title: "Product Strategy",
      desc: "We help you define your product vision, roadmap, and go-to-market strategy to ensure market fit and success.",
      features: ["MVP Development", "User Research", "Technical Feasibility"]
    }
  ];

  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Our Services</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Comprehensive technology solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 block">Our Expertise</span>
            <h2 className="text-4xl font-bold text-white mb-6">Premium Digital Services</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Comprehensive technology solutions engineered for performance, scalability, and business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const id = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and');
              return (
                <div key={index} id={id} className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl group">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed text-sm">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="bg-blue-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
              <p className="text-blue-100 text-lg mb-10">Let's build something extraordinary together.</p>
              <Link 
                href="/contact" 
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
