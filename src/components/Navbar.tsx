"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import { LinkedInIcon, MenuIcon, CloseIcon, ChevronRightIcon } from "./Icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
          current = section.getAttribute("id") || "";
        }
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "EXPERIENCE", href: "#experience" },
    { name: "EDUCATION", href: "#education" },
  ];

  return (
    <header className="nav-container">
      <div className="nav-glass">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3.5 md:py-5 flex items-center justify-between">
          {/* Branding */}
          <div className="flex-1 flex justify-start">
            <Link href="#about" className="group flex items-center gap-2.5 md:gap-3">
              <div className="logo-box">
                <span className="logo-text text-sm md:text-lg">RK</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[9px] md:text-[11px] font-black tracking-[0.2em] text-white pb-[2px]">
                  {resumeData.personal.name.toUpperCase()}
                </span>
                <span className="text-[9px] md:text-[11px] font-medium tracking-[0.2em] text-slate-500">
                  {resumeData.personal.surname.toUpperCase()}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link px-6 py-2.5 rounded-full text-[13px] font-black tracking-widest text-slate-400 hover:text-white transition-all ${
                    activeSection === link.href.substring(1) ? "active" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="linkedin-btn px-3 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <LinkedInIcon />
              <span className="hidden md:inline">LinkedIn</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 active:scale-95 transition-all"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`px-6 pb-8 flex flex-col gap-1 md:hidden ${
          isOpen ? "active" : ""
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="mobile-nav-link text-[12px] font-black tracking-[0.2em] text-slate-400 py-5 border-b border-white/5 flex items-center justify-between"
          >
            <span>{link.name}</span>
            <ChevronRightIcon />
          </Link>
        ))}
      </div>
    </header>
  );
}
