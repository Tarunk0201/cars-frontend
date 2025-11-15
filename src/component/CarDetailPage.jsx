import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronRight,
  Info,
  Palette,
  Filter,
  Check,
  Zap, // Added for electric icon
  Droplet, // Added for fuel icon
  Gauge, // Added for power icon and top speed
  Clock, // Added for acceleration icon
} from "lucide-react";
import VariantSelectorModal from "./CarDetail/VariantSelectorModal";

// --- New Component: Key Specifications ---
const KeySpecs = ({ specifications }) => {
  if (!specifications) return null;

  const formatSpec = (spec) => {
    if (!spec || spec.value === null || spec.value === undefined) return "N/A";
    // Do not show 0cc for electric
    if (spec.unit === "cc" && spec.value === 0) return "N/A";
    return `${spec.value} ${spec.unit || ""}`;
  };

  const formatMileage = (spec) => {
    if (!spec || spec.value === null) return "N/A";
    let type = spec.type || "";
    // Clean up "(Approx.)"
    if (type.includes("Approx")) type = "ARAI";

    return `${spec.value} ${spec.unit || ""} ${type ? `(${type})` : ""}`;
  };

  // Determine if it's an electric variant
  const isElectric = specifications.engineDisplacement?.value === 0;

  const specList = [
    {
      icon: isElectric ? Zap : Droplet,
      name: isElectric ? "Range" : "Mileage",
      value: formatMileage(specifications.mileage),
    },
    {
      icon: Gauge,
      name: "Power",
      value: formatSpec(specifications.power),
    },
    {
      icon: isElectric ? Zap : Droplet, // Use Zap for "Battery"
      name: isElectric ? "Battery" : "Engine",
      value: isElectric ? "N/A" : formatSpec(specifications.engineDisplacement),
    },
    {
      icon: Gauge, // Corrected icon
      name: "Top Speed",
      value: formatSpec(specifications.topSpeed),
    },
    {
      icon: Clock,
      name: "0-100 km/h",
      value: formatSpec(specifications.acceleration?.zeroToHundredKmh),
    },
  ];

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Key Specifications
      </h3>
      <ul className="space-y-2.5">
        {specList.map(
          (spec) =>
            // Only render if value is not "N/A"
            spec.value !== "N/A" && (
              <li key={spec.name} className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <spec.icon className="w-4 h-4 mr-2 text-gray-500" />
                  {spec.name}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {spec.value}
                </span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

// --- Section 1: Hero ---
const HeroSection = ({
  carData,
  selectedVariant,
  setSelectedVariant,
  isModalOpen,
  setIsModalOpen,
  toLakh,
}) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navItems = ["Overview", "360° View"];

  const displayName = `${carData.brand} ${carData.modelName}`;
  const displayDescription = carData.baseDescription;
  const images = carData.baseImageGallery || [];
  const mainImage = images[currentImageIndex]
    ? `${import.meta.env.VITE_BASE_URL}${images[currentImageIndex]}`
    : `https://placehold.co/600x400/e0e0e0/7f7f7f?text=${encodeURIComponent(
        displayName
      )}`;

  const priceRange =
    carData.variants?.length > 0
      ? (() => {
          const prices = carData.variants.map((v) => v.price.amount);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);

          return minPrice === maxPrice
            ? `Rs. ${toLakh(minPrice)} Lakh`
            : `Rs. ${toLakh(minPrice)} - ${toLakh(maxPrice)} Lakh`;
        })()
      : "Price not available";

  const specsToShow = selectedVariant
    ? selectedVariant.specifications
    : carData.variants[0]?.specifications;

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
        <nav className="flex space-x-8 -mb-px overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`py-3 text-sm font-semibold transition-colors whitespace-nowrap ${
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
          <div className="grid grid-cols-5 gap-2 mt-4">
            {images.slice(0, 5).map((image, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_BASE_URL}${image}`}
                alt={`${displayName} view ${index + 1}`}
                className={`w-full h-20 object-cover rounded-md cursor-pointer transition-opacity ${
                  currentImageIndex === index
                    ? "opacity-100 border-2 border-red-600"
                    : "hover:opacity-80 opacity-60"
                }`}
                onClick={() => setCurrentImageIndex(index)}
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
                On-Road Price, India
              </span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">EMI Rs. 1,15,594</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {specsToShow && <KeySpecs specifications={specsToShow} />}
        </div>
      </div>
    </div>
  );
};

// --- Section 2: Common Features ---
const CommonFeatures = ({ carData }) => {
  const displayName = `${carData.brand} ${carData.modelName}`;
  const features = carData.commonFeatures || [];

  if (features.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Key Features of the {displayName}
      </h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// --- Section 3: Price Variants ---
const PriceVariants = ({ carData, toLakh }) => {
  const [fuelType, setFuelType] = useState("All");
  const displayName = `${carData.brand} ${carData.modelName}`;

  const fuelTypes = [
    "All",
    ...new Set(carData.variants?.map((v) => v.fuelType) || []),
  ];

  const filteredVariants =
    carData.variants?.filter(
      (variant) =>
        fuelType === "All" ||
        variant.fuelType.toLowerCase() === fuelType.toLowerCase()
    ) || [];

  const getSpecString = (variant) => {
    const specs = [];
    const engine = variant.specifications?.engineDisplacement;
    if (engine && engine.value > 0) {
      specs.push(`${engine.value} ${engine.unit}`);
    }

    if (variant.fuelType) {
      specs.push(variant.fuelType);
    }
    if (variant.transmission) {
      specs.push(variant.transmission);
    }

    const power = variant.specifications?.power;
    if (power && power.value > 0) {
      specs.push(
        typeof power === "object" ? `${power.value} ${power.unit}` : power
      );
    }

    return specs.join(", ");
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900">{displayName} Price</h2>
      <p className="text-gray-600 text-sm mt-1 mb-4">
        {displayName} price for the base model starts at Rs.{" "}
        {toLakh(
          // <--- TYPO FIX
          Math.min(...(carData.variants?.map((v) => v.price.amount) || [0]))
        )}{" "}
        Lakh and the top model price goes upto Rs.{" "}
        {toLakh(
          Math.max(...(carData.variants?.map((v) => v.price.amount) || [0]))
        )}{" "}
        Lakh (on-road Bangalore). {displayName}
        price for {carData.variants?.length || 0} variants is listed below.
      </p>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4 overflow-x-auto">
        <span className="flex items-center text-sm font-medium text-gray-700 shrink-0">
          <Filter className="w-4 h-4 mr-2" />
          Filter By Fuel type
        </span>
        {fuelTypes.map((fuel) => (
          <button
            key={fuel}
            onClick={() => setFuelType(fuel)}
            className={`px-5 py-1.5 rounded-lg text-sm font-semibold border shrink-0 ${
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
                  {getSpecString(variant)}
                </p>
              </div>
              {/* Price Info */}
              <div className="col-span-2 md:col-span-1">
                <p className="font-bold text-lg text-gray-900 md:hidden">
                  On-Road Price
                </p>
                <p className="font-bold text-lg text-gray-900">
                  Rs. {toLakh(variant.price.amount)} Lakh
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const CarDetailPage = () => {
  const { brandName, modelName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);

  const toLakh = (num) => (num / 100000).toFixed(2);

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        const apiModelName = modelName.replace(/-/g, " ");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/cars?modelName=${encodeURIComponent(
            apiModelName
          )}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCarData(data[0]);
          if (data[0].variants && data[0].variants.length > 0) {
            const firstVariant = data[0].variants[0];
            // Map the first variant to the shape expected by 'selectedVariant'
            setSelectedVariant({
              id: firstVariant.variantId,
              name: firstVariant.variantName,
              fuel: firstVariant.fuelType,
              transmission: firstVariant.transmission,
              price: `Rs. ${toLakh(firstVariant.price.amount)} Lakh`,
              specifications: firstVariant.specifications,
              keyFeatures: firstVariant.keyFeatures,
              availableColors: firstVariant.availableColors,
              images: firstVariant.images,
            });
          }
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
  }, [modelName]); // `toLakh` is defined in-scope, no dependency needed

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 rounded"></div>
              <div className="space-y-4">
                <div className="h-16 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-24 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
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
          toLakh={toLakh}
        />
        <CommonFeatures carData={carData} />
        <PriceVariants carData={carData} toLakh={toLakh} />
        <VariantSelectorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          variants={
            carData.variants?.map((variant, index) => ({
              id: variant.variantId,
              name: variant.variantName,
              fuel: variant.fuelType,
              transmission: variant.transmission,
              price: `Rs. ${toLakh(variant.price.amount)} Lakh`,
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
