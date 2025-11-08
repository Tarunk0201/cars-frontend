import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import VehicleList from "./Brand/VehicleList";
import Sidebar from "./Brand/Sidebar";

const CarListingPage = () => {
  const { brandName, countryName } = useParams();
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Determine if it's a brand or country page
  const isBrandPage = !!brandName;
  const isCountryPage = !!countryName;

  const currentName = brandName || countryName || "";
  const formattedName = currentName
    ? currentName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        let url = "";
        if (isBrandPage) {
          // Decode the URL-encoded brand name and use it exactly as received from the navbar API
          const decodedBrandName = decodeURIComponent(brandName);
          url = `${
            import.meta.env.VITE_BASE_URL
          }/cars/models?brand=${encodeURIComponent(decodedBrandName)}`;
        } else if (isCountryPage) {
          // Decode the URL-encoded country name and use it exactly as received from the navbar API
          const decodedCountryName = decodeURIComponent(countryName);
          url = `${
            import.meta.env.VITE_BASE_URL
          }/cars/by-country/?originCountry=${encodeURIComponent(
            decodedCountryName
          )}`;
        }

        if (url) {
          const response = await fetch(url);
          const data = await response.json();
          setCars(data);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [brandName, countryName, isBrandPage, isCountryPage]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top-level paragraph / description */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isBrandPage
              ? `${formattedName} Cars`
              : isCountryPage
              ? `Cars from ${formattedName}`
              : "Cars"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isBrandPage
              ? `${formattedName} car price starts at Rs 55.98 Lakh for the cheapest model which is 2 Series Gran Coupe and the price of most expensive model, which is XM, starts at Rs 3.14 Crore. ${formattedName} offers 22 car models in India, including 9 cars in SUV category, 8 cars in Sedan category, 1 car in Convertible category...`
              : isCountryPage
              ? `Explore cars from ${formattedName}. Find the perfect vehicle from various brands available in this country.`
              : "Explore our collection of cars."}
            <a href="#" className="text-red-600 hover:underline ml-1">
              more
            </a>
          </p>
        </div>

        {/* Main content area with 2-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Vehicle List */}
          <div className="w-full lg:w-2/3">
            <VehicleList cars={cars} loading={loading} />
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-1/3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;
