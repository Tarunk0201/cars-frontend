import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Car,
  Fuel,
  Gauge,
  SlidersHorizontal,
} from "lucide-react";

const CarSearchWidget = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Country");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterClick = (label) => {
    setActiveFilter(activeFilter === label ? null : label);
    setSearchResults([]);
  };

  const fetchSearchResults = async (query) => {
    if (!query || query.length < 0) return;
    setLoading(true);
    try {
      let url = "";
      if (activeFilter === "Brand") {
        url = `${
          import.meta.env.VITE_BASE_URL
        }/cars/search-brands?q=${encodeURIComponent(query)}`;
      } else if (activeFilter === "Country") {
        url = `${
          import.meta.env.VITE_BASE_URL
        }/cars/search-countries?q=${encodeURIComponent(query)}`;
      } else if (activeFilter === "Car") {
        url = `${
          import.meta.env.VITE_BASE_URL
        }/cars/search-car?q=${encodeURIComponent(query)}`;
      }
      if (url) {
        const response = await fetch(url);
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 300); // Debounce for 300ms
    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeFilter]);

  const handleResultClick = (item) => {
    if (activeFilter === "Brand") {
      navigate(`/cars/${encodeURIComponent(item)}`);
    } else if (activeFilter === "Country") {
      navigate(`/countries/${encodeURIComponent(item)}`);
    } else if (activeFilter === "Car") {
      navigate(
        `/cars/${encodeURIComponent(item.brand)}/${encodeURIComponent(
          item.modelName
        )}`
      );
    }
    setSearchResults([]);
  };

  return (
    <div className="w-full max-w-4xl p-6 mx-auto mb-[-60px] relative z-30 bg-white rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Find Your Right Car</h2>
      </div>

      {/* Search Input Box */}
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden p-1 mb-4 focus-within:border-teal-500">
        <div className="shrink-0 flex text-sm font-medium">
          <button className="px-4 py-2 bg-teal-500 text-white rounded-full">
            New
          </button>
        </div>
        <input
          type="text"
          placeholder="Type to select car name, e.g. Citroen Aircross X"
          className="grow p-2 ml-3 text-gray-700 placeholder-gray-400 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="shrink-0 p-3 text-gray-500 hover:text-teal-500 transition">
          {/* Search icon for search button */}
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        <FilterButton
          icon={Car}
          label="Brand"
          isActive={activeFilter === "Brand"}
          onClick={() => handleFilterClick("Brand")}
        />
        <FilterButton
          icon={MapPin}
          label="Country"
          isActive={activeFilter === "Country"}
          onClick={() => handleFilterClick("Country")}
        />
        <FilterButton
          icon={Gauge}
          label="Car"
          isActive={activeFilter === "Car"}
          onClick={() => handleFilterClick("Car")}
        />
      </div>

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-40 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            searchResults.map((item, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                onClick={() => handleResultClick(item)}
              >
                {activeFilter === "Car" ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">
                        {item.brand} {item.modelName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.bodyType} • {item.power}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        {item.price.currency}{" "}
                        {item.price.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="font-medium text-gray-800">{item}</div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Helper component for filter buttons
const FilterButton = ({ icon: Icon, label, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition duration-200 
      ${
        isActive
          ? "bg-teal-500 text-white border border-teal-500"
          : "text-gray-700 border border-gray-300 hover:bg-gray-100"
      }`}
  >
    <Icon className="w-4 h-4 mr-2" />
    {label}
  </button>
);

export default CarSearchWidget;
