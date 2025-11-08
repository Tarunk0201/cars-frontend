import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronRight,
  Info,
  Palette,
  Filter,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Check,
} from "lucide-react";
import VariantSelectorModal from "./CarDetail/VariantSelectorModal";

// For Pros and Cons
const prosData = [
  "Single-piece curved instrumentation and infotainment looks brilliant and modern.",
  "The long wheelbase and panoramic sunroof make the cabin more spacious and airy.",
  "Powerful output from the smooth 2.0-litre petrol engine, quick gearbox.",
  "High speed stability, overall grip, long distance cruising capability.",
  "Its longer design stance does not make it look unappealing.",
];

const consData = [
  "Tall transmission tunnel inconveniences the middle passenger.",
  "Needs more rear seat-focused comfort and feel-good features.",
  "It is not as nimble as the regular 3 Series.",
];

// --- Section 1: Hero ---
const HeroSection = ({
  carData,
  selectedVariant,
  setSelectedVariant,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navItems = [
    "Overview",
    "360° View",
    "Variants",
    "Offers",
    "Similar Cars",
    "Colours",
  ];

  // Use API data for display
  const displayName = `${carData.brand} ${carData.modelName}`;
  const displayDescription = carData.baseDescription;
  const images = carData.baseImageGallery || [];
  const mainImage = images[currentImageIndex]
    ? `${import.meta.env.VITE_BASE_URL}${images[currentImageIndex]}`
    : `https://placehold.co/600x400/e0e0e0/7f7f7f?text=${encodeURIComponent(
        displayName
      )}`;

  // Calculate price range from variants
  const priceRange =
    carData.variants?.length > 0
      ? (() => {
          const prices = carData.variants.map((v) => v.price.amount);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          return minPrice === maxPrice
            ? `Rs. ${(minPrice / 100000).toFixed(2)} Lakh`
            : `Rs. ${(minPrice / 100000).toFixed(2)} - ${(
                maxPrice / 100000
              ).toFixed(2)} Lakh`;
        })()
      : "Price not available";

  return (
    <div className="w-full">
      {/* Top Details */}
      <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
      <p className="text-gray-600 text-sm mb-4">
        {displayDescription}
        <a href="#" className="text-red-600 ml-1 hover:underline">
          ...more
        </a>
      </p>

      {/* Sticky Nav */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 -mb-px">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`py-3 text-sm font-semibold transition-colors ${
                activeTab === item
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content (Image + Action Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div>
          <img
            src={mainImage}
            alt={displayName}
            className="w-full rounded-lg object-cover shadow-md"
          />
          {/* Multiple Images Gallery */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_BASE_URL}${image}`}
                alt={`${displayName} view ${index + 1}`}
                className={`w-full h-20 object-cover rounded-md cursor-pointer transition-opacity ${
                  currentImageIndex === index + 1
                    ? "opacity-100 border-2 border-red-600"
                    : "hover:opacity-80 opacity-60"
                }`}
                onClick={() => setCurrentImageIndex(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Right: Action Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-4 h-fit">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-between items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors w-full text-left"
          >
            <div>
              <span className="text-xs text-gray-500">Variant</span>
              <p className="font-semibold text-gray-900">
                {selectedVariant ? selectedVariant.name : "Select Variant"}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div>
            <p className="text-3xl font-bold text-gray-900">
              {selectedVariant ? selectedVariant.price : priceRange}
            </p>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-gray-500">
                On-Road Price, Bangalore
              </span>
              <a
                href="#"
                className="text-sm font-medium text-sky-600 hover:underline"
              >
                View Price Breakup
              </a>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">EMI Rs. 1,15,594</span>
                <Info className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">For 5 Years</span>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-sky-600 hover:underline"
              >
                EMI Calculator
              </a>
            </div>
            <a
              href="#"
              className="text-sm font-semibold text-sky-600 border border-sky-600 rounded-md px-4 py-2 hover:bg-sky-50 transition-colors"
            >
              Get EMI Offers
            </a>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Prices above are updated as per the new{" "}
            <span className="font-bold">GST 2.0 tax structure</span>
          </p>

          <button className="w-full bg-red-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-red-700 transition-colors">
            Get Festive Offers
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Section 2: Top Things to Know ---
const TopThingsToKnow = ({ carData }) => {
  const displayName = `${carData.brand} ${carData.modelName}`;
  const topThings = carData.keyHighlights || [];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Top Things to Know About {displayName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThings.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <img
              src={
                item.image
                  ? `${import.meta.env.VITE_BASE_URL}${item.image}`
                  : `https://placehold.co/400x300/e0e0e0/7f7f7f?text=${encodeURIComponent(
                      item.title || "Feature"
                    )}`
              }
              alt={item.title || item.description?.substring(0, 20)}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-800 font-medium">
                {item.title || item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Section 3: Price Variants ---
const PriceVariants = ({ carData }) => {
  const [fuelType, setFuelType] = useState("Petrol");
  const displayName = `${carData.brand} ${carData.modelName}`;

  // Filter variants by fuel type
  const filteredVariants =
    carData.variants?.filter(
      (variant) =>
        fuelType === "All" ||
        variant.fuelType.toLowerCase() === fuelType.toLowerCase()
    ) || [];

  // Get unique fuel types
  const fuelTypes = [
    ...new Set(carData.variants?.map((v) => v.fuelType) || []),
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900">{displayName} Price</h2>
      <p className="text-gray-600 text-sm mt-1 mb-4">
        {displayName} price for the base model starts at Rs.{" "}
        {(
          Math.min(...(carData.variants?.map((v) => v.price.amount) || [0])) /
          100000
        ).toFixed(2)}{" "}
        Lakh and the top model price goes upto Rs.{" "}
        {(
          Math.max(...(carData.variants?.map((v) => v.price.amount) || [0])) /
          100000
        ).toFixed(2)}{" "}
        Lakh (on-road Bangalore). {displayName}
        price for {carData.variants?.length || 0} variants is listed below.
      </p>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center text-sm font-medium text-gray-700">
          <Filter className="w-4 h-4 mr-2" />
          Filter By Fuel type & Transmission
        </span>
        {fuelTypes.map((fuel) => (
          <button
            key={fuel}
            onClick={() => setFuelType(fuel)}
            className={`px-5 py-1.5 rounded-lg text-sm font-semibold border ${
              fuelType === fuel
                ? "bg-gray-100 border-gray-400 text-gray-900"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {fuel}
          </button>
        ))}
      </div>

      {/* Variants List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-3 gap-4 px-6 py-3 bg-gray-50">
          <h4 className="text-sm font-semibold text-gray-600">Variants</h4>
          <h4 className="text-sm font-semibold text-gray-600">On-Road Price</h4>
          <h4 className="text-sm font-semibold text-gray-600 text-right">
            Compare
          </h4>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-200">
          {filteredVariants.map((variant) => (
            <div
              key={variant.variantId}
              className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 hover:bg-gray-50"
            >
              {/* Variant Info */}
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {variant.variantName}
                </h3>
                <p className="text-sm text-gray-500">
                  {(() => {
                    const engine = variant.specifications?.engine;
                    const engineStr =
                      typeof engine === "object"
                        ? `${engine.value} ${engine.unit}`
                        : engine || "N/A";
                    const power = variant.specifications?.power;
                    const powerStr =
                      typeof power === "object"
                        ? `${power.value} ${power.unit}`
                        : power || "N/A";
                    return `${engineStr}, ${variant.fuelType}, ${variant.transmission}, ${powerStr}`;
                  })()}
                </p>
              </div>
              {/* Price Info */}
              <div className="col-span-2 md:col-span-1">
                <p className="font-bold text-lg text-gray-900 md:hidden">
                  On-Road Price
                </p>
                <p className="font-bold text-lg text-gray-900">
                  Rs. {(variant.price.amount / 100000).toFixed(2)} Lakh
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-sm font-medium text-sky-600 hover:underline"
                  >
                    View Price Breakup
                  </a>
                  <a
                    href="#"
                    className="text-sm font-medium text-sky-600 hover:underline"
                  >
                    Get Offers
                  </a>
                </div>
              </div>
              {/* Compare */}
              <div className="flex justify-start md:justify-end items-center gap-2 col-span-2 md:col-span-1">
                <label
                  htmlFor={`compare-${variant.variantId}`}
                  className="text-sm font-medium text-gray-700"
                >
                  Compare
                </label>
                <input
                  id={`compare-${variant.variantId}`}
                  type="checkbox"
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Section 4: Pros and Cons ---
const ProsAndCons = () => (
  <div className="w-full">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">
      How is the BMW 3 Series car?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Pros */}
      <div className="bg-green-50/30 border border-green-200 rounded-lg p-6">
        <h3 className="flex items-center text-xl font-bold text-green-800 mb-4">
          <ThumbsUp className="w-6 h-6 mr-2" /> Pros
        </h3>
        <ul className="space-y-3">
          {prosData.map((pro, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5  shrink-0" />
              <span className="text-gray-700">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Cons */}
      <div className="bg-orange-50/30 border border-orange-200 rounded-lg p-6">
        <h3 className="flex items-center text-xl font-bold text-orange-800 mb-4">
          <ThumbsDown className="w-6 h-6 mr-2" /> Cons
        </h3>
        <ul className="space-y-3">
          {consData.map((con, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-orange-600 mr-2 mt-0.5 shrink-0" />
              <span className="text-gray-700">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// --- Section 5: Compare Similar Cars ---
const CompareSimilarCars = () => (
  <div className="w-full">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">
      Compare 3 Series with Similar Cars
    </h2>
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Scroll Arrows */}
      <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md border border-gray-300 ml-2 hover:bg-gray-100 z-10">
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-md border border-gray-300 mr-2 hover:bg-gray-100 z-10">
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                On-Road Price, Bangalore
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mileage ARAI
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comparisonData.map((car) => (
              <tr key={car.name} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href="#"
                    className="text-sm font-bold text-gray-900 hover:text-red-600 flex items-center"
                  >
                    {car.name}{" "}
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-1" />
                  </a>
                </td>
                <td className="px-6 py-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-28 h-auto rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-semibold text-gray-900">
                    {car.price}
                  </p>
                  <span className="text-xs text-gray-500">onwards</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {car.rating}/5
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {car.reviews} Ratings
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">
                    {car.mileage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
// This assembles all the sections in order.

const CarDetailPage = () => {
  const { brandName, modelName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        // Convert URL format back to API format
        const apiModelName = modelName.replace(/-/g, " ");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/cars?modelName=${encodeURIComponent(
            apiModelName
          )}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCarData(data[0]); // Take the first car from the array
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (modelName) {
      fetchCarData();
    }
  }, [modelName]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-300 rounded"></div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Car Not Found
            </h1>
            <p className="text-gray-600">
              The requested car could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <HeroSection
          carData={carData}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <TopThingsToKnow carData={carData} />
        <PriceVariants carData={carData} />
        <ProsAndCons />
        <VariantSelectorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          variants={
            carData.variants?.map((variant, index) => ({
              id: variant.variantId,
              name: variant.variantName,
              fuel: variant.fuelType,
              transmission: variant.transmission,
              price: `Rs. ${(variant.price.amount / 100000).toFixed(2)} Lakh`,
              specifications: variant.specifications,
              keyFeatures: variant.keyFeatures,
              availableColors: variant.availableColors,
              images: variant.images,
            })) || []
          }
          onSelect={(variant) => {
            setSelectedVariant(variant);
            setIsModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default CarDetailPage;
