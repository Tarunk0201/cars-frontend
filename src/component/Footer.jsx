import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
          {/* Brand and Copyright */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-800">DreamWheel</h3>
            <p className="mt-2 text-sm text-gray-500">
              &copy; {currentYear} DreamWheel. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center mb-4 md:mb-0 md:flex-row md:gap-8">
            <Link
              to="/about"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-2 md:mb-0"
            >
              About
            </Link>
            {/* <Link
              to="/services"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-2 md:mb-0"
            >
              Services
            </Link> */}
            <Link
              to="/contact"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-2 md:mb-0"
            >
              Contact
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6">
            <a
              href="https://x.com/tarundev_in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter profile"
              className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
            >
              {/* Lucide icon usage */}
              <Twitter size={20} strokeWidth={2} />
            </a>
            <a
              href="https://github.com/Tarunk0201"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
            >
              {/* Lucide icon usage */}
              <Github size={20} strokeWidth={2} />
            </a>
            <a
              href="https://www.linkedin.com/in/tarun-kumar-singh-b939972a2/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-gray-500 hover:text-blue-700 transition-colors duration-300"
            >
              {/* Lucide icon usage */}
              <Linkedin size={20} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
