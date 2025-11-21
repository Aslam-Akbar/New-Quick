import React from "react";
import Link from "next/link";
import { FaCode, FaServer, FaMobileAlt, FaRocket, FaChartLine } from "react-icons/fa";
// import "./assets/css/home.css"; // Removed

const Content = () => {
  const services = [
    {
      title: "Software Development",
      desc: "Custom ERPs, CRMs, and SaaS platforms engineered for security and scale. We turn complex business logic into streamlined software.",
      icon: <FaCode />,
    },
    {
      title: "Web Application Engineering",
      desc: "Next.js and React architectures that load in milliseconds. SEO-ready, accessible, and built for high traffic.",
      icon: <FaServer />,
    },
    {
      title: "Android Mobile Experience",
      desc: "Native Kotlin and Flutter development. We build intuitive, crash-free mobile apps that users love to open.",
      icon: <FaMobileAlt />,
    },
    {
      title: "Growth Engineering (SEO)",
      desc: "Technical audits and programmatic SEO. We don't just guess keywords; we engineer your site architecture to dominate search rankings.",
      icon: <FaRocket />,
    },
    {
      title: "Digital Transformation",
      desc: "Data-driven marketing campaigns and analytics dashboards that prove ROI. We turn your traffic into revenue.",
      icon: <FaChartLine />,
    },
  ];

  const techStack = [
    { category: "Frontend", techs: ["React", "Next.js", "Tailwind CSS", "Flutter"] },
    { category: "Backend", techs: ["Node.js", "Python", "Supabase", "PostgreSQL"] },
    { category: "Cloud", techs: ["AWS", "Docker", "Firebase"] }
  ];

  return (
    <div className="bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-6 border border-blue-500/20">
                Premium Software Agency
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Engineering</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Digital</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Dominance.</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                We build scalable software, high-performance mobile apps, and data-driven growth engines for ambitious enterprises.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
                >
                  Start Your Project
                </Link>
                <Link 
                  href="#work" 
                  className="w-full sm:w-auto bg-transparent border border-slate-700 text-white hover:bg-white/5 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>
              <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="font-mono text-sm leading-relaxed">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span style={{color: '#c678dd'}}>const</span> <span style={{color: '#e5c07b'}}>Dominance</span> = <span style={{color: '#c678dd'}}>new</span> <span style={{color: '#e5c07b'}}>DigitalFuture</span>();<br/>
                  <br/>
                  <span style={{color: '#e06c75'}}>Dominance</span>.<span style={{color: '#61afef'}}>scale</span>(<span style={{color: '#d19a66'}}>1000</span>);<br/>
                  <span style={{color: '#e06c75'}}>Dominance</span>.<span style={{color: '#61afef'}}>optimize</span>(<span style={{color: '#98c379'}}>'Revenue'</span>);<br/>
                  <br/>
                  <span style={{color: '#abb2bf'}}>{'// Engineered for growth'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack (Trust Section) */}
      <section className="py-12 border-y border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-wider mb-8">Powered by Modern Tech</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <div key={index} className="text-center">
                <h4 className="text-white font-semibold mb-4">{stack.category}</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {stack.techs.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400 text-sm hover:bg-white/10 hover:text-white transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24" id="services">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 block">What We Do</span>
            <h2 className="text-4xl font-bold text-white mb-6">Our Core Services</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              We focus on five key areas to deliver maximum impact for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl group flex flex-col" key={index}>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed text-sm flex-grow">{service.desc}</p>
                <Link href="/contact" className="text-blue-400 font-semibold hover:text-blue-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
