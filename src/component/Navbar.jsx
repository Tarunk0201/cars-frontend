import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, MapPin, User, ChevronDown } from "lucide-react"; // Added ChevronDown

// --- Predefined data for the mega menus ---
const megaMenuData = {
  carBrands: {
    id: "brands",
    columns: [],
  },
  carCountries: {
    id: "countries",
    columns: [],
  },
};

// Your original component, renamed for clarity
const SimpleNavItem = ({ children, to }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-red-600 font-semibold text-sm transition duration-150 py-2"
  >
    {children}
  </Link>
);

// New component for the dropdown trigger (the link in the navbar)
const DropdownNavItem = ({ title, isActive, onHover }) => (
  <button
    onMouseEnter={onHover}
    className="flex items-center gap-1 text-gray-700 hover:text-red-600 font-semibold text-sm transition duration-150 py-2"
  >
    {title}
    <ChevronDown
      className={`w-4 h-4 transition-transform duration-200 ${
        isActive ? "rotate-180" : ""
      }`}
      strokeWidth={3}
    />
  </button>
);

// New component for the dropdown panel itself
const MegaMenuPanel = ({ data, isCountry = false }) => {
  const items = data.columns[0]?.links || [];
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-white shadow-2xl rounded-b-lg border border-gray-200 p-6 z-50 w-max"
      // The onMouseLeave is handled by the parent wrapper
    >
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <Link
            key={item}
            to={
              isCountry
                ? `/countries/${encodeURIComponent(item)}`
                : `/cars/${encodeURIComponent(item)}`
            }
            className="text-sm text-gray-600 hover:text-red-600 transition duration-150"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- Your Updated NavBar Component ---

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(null); // 'country', 'brands', or null
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/cars/brands`
        );
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/cars/countries`
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchBrands();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (brands.length > 0) {
      megaMenuData.carBrands.columns = [
        {
          heading: "Brands",
          links: brands,
        },
      ];
    }
  }, [brands]);

  useEffect(() => {
    if (countries.length > 0) {
      megaMenuData.carCountries.columns = [
        {
          heading: "Countries",
          links: countries,
        },
      ];
    }
  }, [countries]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-12">
          {/* Logo */}
          <div className="text-xl font-bold text-red-600">
            <span className="bg-red-600 text-white px-1 py-0.5 rounded-l-md">
              Dream
            </span>
            <span className="text-red-600 border border-red-600 px-1 py-0.5 rounded-r-md">
              Wheels
            </span>
          </div>

          {/* Navigation Links */}
          <div
            className="hidden md:flex space-x-8"
            onMouseLeave={() => setOpenMenu(null)} // Close menu when mouse leaves the whole nav area
          >
            <SimpleNavItem to="/">Home</SimpleNavItem>

            {/* Car Brands Dropdown */}
            <div className="relative">
              <DropdownNavItem
                title="Car Brands"
                isActive={openMenu === "brands"}
                onHover={() => setOpenMenu("brands")}
              />
              {openMenu === "brands" && (
                <MegaMenuPanel data={megaMenuData.carBrands} />
              )}
            </div>

            {/* Countries Dropdown */}
            <div className="relative">
              <DropdownNavItem
                title="Countries"
                isActive={openMenu === "countries"}
                onHover={() => setOpenMenu("countries")}
              />
              {openMenu === "countries" && (
                <MegaMenuPanel
                  data={megaMenuData.carCountries}
                  isCountry={true}
                />
              )}
            </div>
          </div>
        </div>

        {/* Search and User Icons Section */}
        <div className="flex items-center space-x-4">
          {/* Icon Links */}
          <div className="flex space-x-3 text-gray-600">
            <a
              href="#"
              className="p-2 hover:text-red-600 transition duration-150"
            >
              <Heart className="w-6 h-6" />
            </a>
            <Link
              to="/contact"
              className="p-2 hover:text-red-600 transition duration-150"
            >
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
