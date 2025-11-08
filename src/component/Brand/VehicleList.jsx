import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { ChevronDown, Star, Filter } from "lucide-react";

// --- Reusable Components (defined in the same file for simplicity) ---

// Filter Button Component
const FilterButton = ({ children, hasIcon = false }) => (
  <button className="flex items-center justify-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
    {children}
    {hasIcon && <ChevronDown className="w-4 h-4 ml-2" />}
  </button>
);

// Car Card Component
const CarCard = ({ car, brand }) => (
  <Link to={`/cars/${brand}/${car.modelName.replace(/\s+/g, "-")}`}>
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="w-full sm:w-1/3 shrink-0">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-40 sm:h-full object-cover rounded-md"
        />
      </div>

      {/* Details */}
      <div className="grow">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center gap-1 text-sm bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded">
            <Star className="w-3 h-3 fill-green-600 text-green-600" />
            {car.rating}
          </span>
          <span className="text-xs text-gray-500">({car.reviews} Ratings)</span>
        </div>

        {/* Name & Specs */}
        <h3 className="text-xl font-bold text-gray-900 hover:text-red-600 cursor-pointer">
          {car.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{car.specs}</p>

        {/* Price */}
        <div className="text-lg font-bold text-gray-900">
          {car.price}
          <span className="text-sm font-normal text-gray-500"> onwards</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">{car.location}</p>

        {/* Offer */}
        <span
          className="text-sm font-semibold text-red-600 hover:underline cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {car.offer}
        </span>
      </div>
    </div>
  </Link>
);

// --- Main VehicleList Component ---

const VehicleList = ({ cars = [], loading = false }) => {
  const { brandName } = useParams();
  const location = useLocation();
  const [sortBy, setSortBy] = useState("popularity");

  // Determine if it's a brand or country page
  const isBrandPage = brandName && !location.pathname.includes("/countries/");
  const isCountryPage = location.pathname.includes("/countries/");

  // Transform API data to match component expectations
  const transformCarData = (apiData) => {
    if (Array.isArray(apiData)) {
      // Brand API response: array of car objects
      return apiData.map((car, index) => ({
        id: index + 1,
        name: car.modelName,
        modelName: car.modelName,
        specs: `${car.bodyType} • ${car.generation} • ${car.power}`,
        price: `Rs. ${(car.price.amount / 100000).toFixed(2)} Lakh`,
        priceValue: car.price.amount,
        location: "On-Road Price, Bangalore",
        rating: 4.5, // Default rating since not in API
        reviews: Math.floor(Math.random() * 50) + 10, // Random reviews
        imageUrl: car.image
          ? `${import.meta.env.VITE_BASE_URL}${car.image}`
          : `https://placehold.co/400x300/e0e0e0/7f7f7f?text=${encodeURIComponent(
              car.modelName
            )}`,
        offer: "Get Best Offer",
        brand: brandName
          ? brandName
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())
          : "",
      }));
    } else if (typeof apiData === "object" && apiData !== null) {
      // Country API response: object with brands as keys
      const allCars = [];
      Object.entries(apiData).forEach(([brand, brandCars]) => {
        brandCars.forEach((car, index) => {
          allCars.push({
            id: `${brand}-${index + 1}`,
            name: `${brand} ${car.modelName}`,
            modelName: car.modelName,
            specs: `${car.bodyType} • ${car.generation} • ${car.power}`,
            price: `Rs. ${(car.price.amount / 100000).toFixed(2)} Lakh`,
            priceValue: car.price.amount,
            location: "On-Road Price, Bangalore",
            rating: 4.5,
            reviews: Math.floor(Math.random() * 50) + 10,
            imageUrl: car.image
              ? `${import.meta.env.VITE_BASE_URL}${car.image}`
              : `https://placehold.co/400x300/e0e0e0/7f7f7f?text=${encodeURIComponent(
                  `${brand} ${car.modelName}`
                )}`,
            offer: "Get Best Offer",
            brand: brand,
          });
        });
      });
      return allCars;
    }
    return [];
  };

  const carData = transformCarData(cars);

  // Sort the car data based on sortBy
  const sortedCarData = [...carData].sort((a, b) => {
    if (sortBy === "price_low_high") {
      return a.priceValue - b.priceValue;
    } else if (sortBy === "price_high_low") {
      return b.priceValue - a.priceValue;
    }
    // For popularity, keep original order
    return 0;
  });

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {isBrandPage
          ? `${brandName
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())} Car Models`
          : isCountryPage
          ? `Cars from ${location.pathname
              .split("/countries/")[1]
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}`
          : "Car Models"}
      </h2>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* <button className="flex items-center justify-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          Make
        </button>
        <FilterButton>Budget</FilterButton>
        <FilterButton>Body Type</FilterButton>
        <FilterButton hasIcon>More Filters</FilterButton> */}

        {/* Sort Dropdown */}
        <div className="relative ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500 pr-8"
          >
            <option value="popularity">Popularity</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Car List */}
      <div className="space-y-6">
        {sortedCarData.length > 0 ? (
          sortedCarData.map((car) => (
            <CarCard key={car.id} car={car} brand={car.brand} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No cars found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
