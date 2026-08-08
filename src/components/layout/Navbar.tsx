"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const serviceDropdownItems = [
  { href: "/services/moving", label: "Moving Services" },
  { href: "/services/cleaning", label: "Cleaning Services" },
  { href: "/services/laundry", label: "Laundry Services" },
  { href: "/services/repair", label: "Home Repair" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isServicesActive = pathname.startsWith("/services");

  return (
    <nav className="relative z-50 flex items-center justify-between w-full pb-2">
      {/* ── Logo ── */}
      <Link
        href="/"
        className="relative w-[260px] h-[80px] shrink-0 flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out"
      >
        <Image
          src="/images/logo-elc.png"
          alt="Easy Lift and Clean — Home services made easy"
          width={260}
          height={80}
          className="object-contain object-left w-full h-full"
          priority
        />
      </Link>

      {/* ── Desktop Nav Links with Dynamic Active Indicator & Services Dropdown ── */}
      <div className="hidden md:flex gap-6 lg:gap-8 items-center">
        {/* Home Link */}
        <Link
          href="/"
          className={`px-4 py-2 rounded-[20px] text-base leading-[1.4] whitespace-nowrap transition-all duration-200 ${
            pathname === "/"
              ? "bg-white/10 border border-white/10 text-white font-semibold flex gap-[10px] items-center"
              : "text-[#d8d8d8] font-normal hover:text-white hover:bg-white/5"
          }`}
        >
          {pathname === "/" && (
            <span className="block size-[10px] rounded-full bg-white shrink-0" aria-hidden="true" />
          )}
          <span>Home</span>
        </Link>

        {/* About Link */}
        <Link
          href="/about"
          className={`px-4 py-2 rounded-[20px] text-base leading-[1.4] whitespace-nowrap transition-all duration-200 ${
            pathname.startsWith("/about")
              ? "bg-white/10 border border-white/10 text-white font-semibold flex gap-[10px] items-center"
              : "text-[#d8d8d8] font-normal hover:text-white hover:bg-white/5"
          }`}
        >
          {pathname.startsWith("/about") && (
            <span className="block size-[10px] rounded-full bg-white shrink-0" aria-hidden="true" />
          )}
          <span>About</span>
        </Link>

        {/* Services Link with Interactive Dropdown Card */}
        <div
          ref={dropdownRef}
          className="relative"
          onMouseEnter={() => setServicesDropdownOpen(true)}
          onMouseLeave={() => setServicesDropdownOpen(false)}
        >
          <button
            type="button"
            onClick={() => setServicesDropdownOpen((prev) => !prev)}
            className={`px-4 py-2 rounded-[20px] text-base leading-[1.4] whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              isServicesActive
                ? "bg-white/10 border border-white/10 text-white font-semibold"
                : "text-[#d8d8d8] font-normal hover:text-white hover:bg-white/5"
            }`}
          >
            {isServicesActive && (
              <span className="block size-[10px] rounded-full bg-white shrink-0" aria-hidden="true" />
            )}
            <span>Services</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform duration-200 ${
                servicesDropdownOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* White Services Dropdown Card */}
          {servicesDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-[220px] bg-white rounded-[18px] p-2 shadow-2xl border border-black/5 z-50 flex flex-col gap-1 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
              {serviceDropdownItems.map((item, index) => {
                const isItemActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setServicesDropdownOpen(false)}
                    className={`
                      px-3.5 py-2.5 rounded-[12px] text-[15px] font-medium transition-all duration-150
                      flex items-center justify-between
                      ${
                        isItemActive
                          ? "bg-[#08203c] text-white"
                          : "text-[#0b1714] hover:bg-[#08203c]/10 hover:text-[#08203c]"
                      }
                      ${index !== serviceDropdownItems.length - 1 ? "border-b border-black/5" : ""}
                    `}
                  >
                    <span>{item.label}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="opacity-70"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Login Link */}
        <Link
          href="/login"
          className={`px-4 py-2 rounded-[20px] text-base leading-[1.4] whitespace-nowrap transition-all duration-200 ${
            pathname.startsWith("/login")
              ? "bg-white/10 border border-white/10 text-white font-semibold flex gap-[10px] items-center"
              : "text-[#d8d8d8] font-normal hover:text-white hover:bg-white/5"
          }`}
        >
          {pathname.startsWith("/login") && (
            <span className="block size-[10px] rounded-full bg-white shrink-0" aria-hidden="true" />
          )}
          <span>Login</span>
        </Link>
      </div>

      {/* ── Contact Us Button ── */}
      <Link
        href="/contact"
        id="navbar-contact-btn"
        className="hidden md:flex bg-white items-center justify-between pl-6 pr-2 py-2 rounded-[24px] w-[166px] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ease-in-out cursor-pointer shadow-md"
      >
        <span className="font-semibold text-[#0b1714] text-base leading-[1.4] whitespace-nowrap">
          Contact Us
        </span>
        <div className="bg-[#08203c] flex items-center justify-center p-2 rounded-[20px] size-[34px] shrink-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4.5l3.5 3.5L9 11.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>

      {/* ── Mobile Hamburger ── */}
      <button
        id="mobile-menu-toggle"
        className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l14 14M18 4L4 18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h16M3 11h16M3 16h16" />
          </svg>
        )}
      </button>

      {/* ── Mobile Dropdown Menu ── */}
      {menuOpen && (
        <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-[#0a2a4e] border border-white/10 rounded-2xl p-4 flex flex-col gap-1 md:hidden shadow-2xl z-50">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 text-[#d8d8d8] hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 text-[#d8d8d8] hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            About
          </Link>

          {/* Services Mobile Expandable Submenu */}
          <div className="flex flex-col gap-1">
            <span className="px-4 py-2 text-xs font-bold text-white/50 uppercase tracking-wider">
              Services
            </span>
            {serviceDropdownItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="pl-8 pr-4 py-2.5 text-[#d8d8d8] hover:text-white hover:bg-white/10 rounded-xl transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 text-[#d8d8d8] hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            Login
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-full bg-white text-[#0b1714] font-semibold text-base text-center py-3 rounded-[24px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
