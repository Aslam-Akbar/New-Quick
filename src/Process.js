import React from "react";
import { FaSearch, FaPencilRuler, FaCode, FaRocket, FaSync } from "react-icons/fa";

const Process = () => {
  const steps = [
    {
      icon: <FaSearch />,
      step: "01",
      title: "Discovery & Strategy",
      desc: "We start by understanding your business goals, user needs, and technical requirements. We define the scope and create a strategic roadmap."
    },
    {
      icon: <FaPencilRuler />,
      step: "02",
      title: "Design & Prototyping",
      desc: "Our designers create intuitive and engaging user interfaces. We build interactive prototypes to validate concepts before coding begins."
    },
    {
      icon: <FaCode />,
      step: "03",
      title: "Agile Development",
      desc: "We build your software in iterative sprints, ensuring flexibility and transparency. You get regular updates and demos of working software."
    },
    {
      icon: <FaRocket />,
      step: "04",
      title: "Testing & Launch",
      desc: "Rigorous testing ensures your software is bug-free and performs flawlessly. We handle the deployment process for a smooth launch."
    },
    {
      icon: <FaSync />,
      step: "05",
      title: "Maintenance & Growth",
      desc: "We provide ongoing support, monitoring, and updates. We help you scale your product and adapt to changing market needs."
    }
  ];

  return (
    <div className="bg-slate-900 min-h-screen py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20">
            How We Work
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Agile Workflow</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A transparent, iterative process designed to deliver high-quality software on time and within budget.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 -translate-x-1/2"></div>

          <div className="space-y-8 lg:space-y-0">
            {steps.map((item, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 relative group ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="flex-1 w-full lg:w-1/2 p-0 lg:p-12">
                  <div className={`relative bg-slate-800/50 backdrop-blur-xl border border-white/10 p-6 lg:p-8 rounded-2xl overflow-hidden hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 group-hover:border-blue-500/30 ${index % 2 === 0 ? 'text-left' : 'text-left lg:text-right'}`}>
                    
                    <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-start lg:items-end'}`}>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center text-blue-400 text-2xl mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Step Number Background (Mobile Only) */}
                    <div className="lg:hidden absolute top-6 right-6 text-6xl font-bold text-white/5 select-none pointer-events-none">
                      {item.step}
                    </div>
                  </div>
                </div>

                {/* Center Step Number (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-900 border border-blue-500/50 items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                </div>

                {/* Empty Side for Balance & Big Number */}
                <div className="flex-1 hidden lg:flex items-center justify-center">
                  <span className="text-[180px] font-bold text-white/5 select-none pointer-events-none">
                    {item.step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
