"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header on client portal
  if (pathname?.startsWith('/client-portal')) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight">
          Quick Tech <span className="text-blue-500">Solutions</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li><Link href="/" className="text-slate-300 hover:text-white font-medium transition-colors">Home</Link></li>
            <li><Link href="/services" className="text-slate-300 hover:text-white font-medium transition-colors">Services</Link></li>
            <li><Link href="/process" className="text-slate-300 hover:text-white font-medium transition-colors">Process</Link></li>
            <li><Link href="/careers" className="text-slate-300 hover:text-white font-medium transition-colors">Careers</Link></li>
            <li><Link href="/about" className="text-slate-300 hover:text-white font-medium transition-colors">Company</Link></li>
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-slate-300 hover:text-white font-medium transition-colors">Client Login</Link>
          <Link 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          type="button"
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div 
          className={`absolute top-full left-0 w-full bg-slate-900 border-t border-white/10 shadow-xl transition-all duration-300 overflow-hidden md:hidden ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col p-6 space-y-4">
            <ul className="flex flex-col space-y-4">
              <li><Link href="/" className="block text-slate-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link href="/services" className="block text-slate-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Services</Link></li>
              <li><Link href="/process" className="block text-slate-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Process</Link></li>
              <li><Link href="/careers" className="block text-slate-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Careers</Link></li>
              <li><Link href="/about" className="block text-slate-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Company</Link></li>
            </ul>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              <Link href="/login" className="text-slate-300 hover:text-white font-medium" onClick={() => setIsOpen(false)}>Client Login</Link>
              <Link 
                href="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold text-center transition-all shadow-lg" 
                onClick={() => setIsOpen(false)}
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
