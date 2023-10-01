import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const menuItems = [
    {
      text: "Home",
      link: "#",
    },
    {
      text: "About",
      link: "#about",
    },
    {
      text: "Contact",
      link: "#contact",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <nav className={` bg-white w-screen ${isMobile ? 'px-4' : ""}`}>
      <div className="container mx-auto py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
          <span className="ml-3 text-xl font-semibold tracking-tight">
            Yayasan Srikandi
          </span>
        </div>
        {isMobile ? (
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="block text-gray-800 hover:text-primary-color focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4 justify-center">
            {menuItems.map((item) => (
              <a
                key={item.text}
                className="text-gray-800 hover:text-primary-color"
                href={item.link}
              >
                {item.text}
              </a>
            ))}
          </div>
        )}
      </div>
      {isMobile && isMenuOpen && (
        <div className="bg-white">
          {menuItems.map((item) => (
            <a
              key={item.text}
              className="block py-2 px-4 text-gray-800 hover:text-primary-color"
              href={item.link}
              onClick={closeMenu}
            >
              {item.text}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
