"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/features/auth/authSlice";
import { useSignOutMutation } from "@/lib/redux/features/auth/authApi";

const serviceDropdownItems = [
  { href: "/services/moving", label: "Moving Services" },
  { href: "/services/cleaning", label: "Cleaning Services" },
  { href: "/services/laundry", label: "Laundry Services" },
  { href: "/services/repair", label: "Home Repair" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, access } = useAppSelector((state) => state.auth);
  const [signOut] = useSignOutMutation();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isServicesActive = pathname.startsWith("/services");
  const isLoggedIn = Boolean(user && access);
  const initial =
    user?.full_name?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMenuOpen(false);
    try {
      await signOut().unwrap();
    } catch (err) {
      console.error("Sign out API error (proceeding with local cleanup):", err);
    } finally {
      dispatch(logout());
      router.push("/");
    }
  };

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

      {/* ── Desktop Nav Links ── */}
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
            <span
              className="block size-[10px] rounded-full bg-white shrink-0"
              aria-hidden="true"
            />
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
            <span
              className="block size-[10px] rounded-full bg-white shrink-0"
              aria-hidden="true"
            />
          )}
          <span>About</span>
        </Link>

        {/* Services Dropdown */}
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
              <span
                className="block size-[10px] rounded-full bg-white shrink-0"
                aria-hidden="true"
              />
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
                      ${
                        index !== serviceDropdownItems.length - 1
                          ? "border-b border-black/5"
                          : ""
                      }
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

        {/* ── Auth Conditional Item (Login vs User Dropdown) ── */}
        {!isLoggedIn ? (
          <Link
            href="/login"
            id="navbar-login-btn"
            className={`px-4 py-2 rounded-[20px] text-base leading-[1.4] whitespace-nowrap transition-all duration-200 ${
              pathname.startsWith("/login")
                ? "bg-white/10 border border-white/10 text-white font-semibold flex gap-[10px] items-center"
                : "text-[#d8d8d8] font-normal hover:text-white hover:bg-white/5"
            }`}
          >
            {pathname.startsWith("/login") && (
              <span
                className="block size-[10px] rounded-full bg-white shrink-0"
                aria-hidden="true"
              />
            )}
            <span>Login</span>
          </Link>
        ) : (
          <div ref={userDropdownRef} className="relative">
            <button
              type="button"
              id="user-profile-menu-btn"
              onClick={() => setUserDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-[20px] bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.full_name || "User Avatar"}
                  className="size-8 rounded-full object-cover border border-white/30"
                />
              ) : (
                <div className="size-8 rounded-full bg-[#08203c] text-white font-bold text-sm flex items-center justify-center border border-white/30 shrink-0">
                  {initial}
                </div>
              )}
              <span className="text-sm font-semibold text-white max-w-[120px] truncate">
                {user?.full_name || user?.email || "Account"}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform duration-200 ${
                  userDropdownOpen ? "rotate-180" : ""
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

            {userDropdownOpen && (
              <div
                id="user-dropdown-menu"
                className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-[18px] p-2 shadow-2xl border border-black/5 z-50 flex flex-col gap-1 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-3.5 py-2 border-b border-black/5">
                  <p className="text-xs font-semibold text-[#0b1714] truncate">
                    {user?.full_name || "Logged In User"}
                  </p>
                  <p className="text-[11px] text-[#6b7280] truncate">
                    {user?.email}
                  </p>
                </div>

                <Link
                  href="/my-bookings"
                  id="nav-my-bookings-link"
                  onClick={() => setUserDropdownOpen(false)}
                  className="px-3.5 py-2.5 rounded-[12px] text-[15px] font-medium text-[#0b1714] hover:bg-[#08203c]/10 hover:text-[#08203c] transition-all duration-150 flex items-center justify-between"
                >
                  <span>My Bookings</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="opacity-70"
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

                <button
                  type="button"
                  id="nav-logout-btn"
                  onClick={handleLogout}
                  className="w-full text-left px-3.5 py-2.5 rounded-[12px] text-[15px] font-medium text-red-600 hover:bg-red-50 transition-all duration-150 flex items-center justify-between cursor-pointer"
                >
                  <span>Logout</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 12L10 8L6 4" />
                    <path d="M10 8H2" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
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
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 4l14 14M18 4L4 18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
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

          {!isLoggedIn ? (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-[#d8d8d8] hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              Login
            </Link>
          ) : (
            <div className="flex flex-col gap-1 border-t border-white/10 pt-2 mt-1">
              <div className="px-4 py-2">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.full_name || "Logged In"}
                </p>
                <p className="text-xs text-white/60 truncate">{user?.email}</p>
              </div>
              <Link
                href="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-[#d8d8d8] hover:text-white hover:bg-white/10 rounded-xl transition-colors text-sm"
              >
                My Bookings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-xl transition-colors text-sm font-semibold cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}

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
