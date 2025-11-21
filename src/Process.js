import React from "react";
import { FaSearch, FaPencilRuler, FaCode, FaRocket, FaSync } from "react-icons/fa";
// import "./assets/css/style.css"; // Removed

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
    <div className="bg-slate-900 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 block">How We Work</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">The Agile Workflow</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A transparent, iterative process designed to deliver high-quality software on time and within budget.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 -translate-x-1/2"></div>

          <div className="space-y-12 lg:space-y-24">
            {steps.map((item, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:items-start' : 'lg:items-end'}`}>
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-2xl mb-6 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </div>

                {/* Center Step Number */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center text-sm font-bold text-slate-500 shadow-xl">
                    {item.step}
                  </div>
                </div>

                {/* Empty Side for Balance */}
                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
