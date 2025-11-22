'use client'

import React, { useState, useEffect } from "react";
import { getPublicJobPostings } from "../actions/public-careers";
import { FaUsers, FaLaptopCode, FaCoffee, FaHeart } from "react-icons/fa";
// import "./assets/css/style.css"; // Removed

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getPublicJobPostings();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const benefits = [
    { icon: <FaUsers />, title: "Collaborative Culture", desc: "Work with smart, passionate people who love what they do." },
    { icon: <FaLaptopCode />, title: "Remote-First", desc: "Work from anywhere. We focus on output, not hours." },
    { icon: <FaCoffee />, title: "Continuous Learning", desc: "Stipends for courses, conferences, and books." },
    { icon: <FaHeart />, title: "Health & Wellness", desc: "Comprehensive health insurance and wellness programs." }
  ];

  return (
    <div className="bg-slate-900 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 block">Join Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Build the Future With Us</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            We're looking for exceptional talent to help us solve complex problems and deliver amazing software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {benefits.map((item, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Open Positions</h2>
          {loading ? (
            <div className="text-center py-12 text-slate-500">
              <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              Loading positions...
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-slate-800 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">{job.department}</span>
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                      <span>{job.type}</span>
                      <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <button className="w-full md:w-auto px-6 py-2.5 rounded-lg border border-blue-500/30 text-blue-400 font-semibold hover:bg-blue-500 hover:text-white transition-all">
                    Apply Now
                  </button>
                </div>
              ))}
              {jobs.length === 0 && (
                <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-white/5 text-slate-500">
                  No open positions at the moment. Check back soon!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
