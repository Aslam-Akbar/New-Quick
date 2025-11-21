"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaXTwitter, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const pathname = usePathname();

  // Hide footer on client portal
  if (pathname?.startsWith('/client-portal')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight block">
              Quick Tech <span className="text-blue-500">Solutions</span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Enterprise-grade software development for the modern web.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://x.com/QuickTechS50280" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer"><FaXTwitter size={18} /></a>
              <a href="https://www.youtube.com/@QuicktechsolutionsYT" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube size={18} /></a>
              <a href="https://www.instagram.com/quicktechsolutions_ig/" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram size={18} /></a>
              <a href="https://www.linkedin.com/in/quicktechsolutions/" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin size={18} /></a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services#custom-software-development" className="text-slate-400 hover:text-blue-400 transition-colors">Software Development</Link></li>
              <li><Link href="/services#mobile-app-development" className="text-slate-400 hover:text-blue-400 transition-colors">Mobile Engineering</Link></li>
              <li><Link href="/services#cloud-infrastructure" className="text-slate-400 hover:text-blue-400 transition-colors">Cloud Infrastructure</Link></li>
              <li><Link href="/services#growth-and-analytics" className="text-slate-400 hover:text-blue-400 transition-colors">Growth Engineering</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/process" className="text-slate-400 hover:text-blue-400 transition-colors">Our Process (Agile)</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-blue-400 transition-colors">Careers (Hiring)</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Legal & Compliance</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-slate-400 hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/support" className="text-slate-400 hover:text-blue-400 transition-colors">SLA & Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; 2025 Quick Tech Solutions. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            MSME Registered | ISO 9001 Standards Compliant
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
