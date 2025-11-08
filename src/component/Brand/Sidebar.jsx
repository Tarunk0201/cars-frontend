import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// --- Reusable Brand Card Component ---
const BrandCard = ({ title, brands }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 p-4 border-b border-gray-200">
        {title}
      </h3>

      {/* Grid for brands */}
      <div className="grid grid-cols-3">
        {brands.map((brand, index) => (
          <Link
            key={brand.name}
            to={`/cars/${encodeURIComponent(brand.name)}`}
            className="flex flex-col items-center justify-center p-4 text-center border-b border-r border-gray-200 hover:bg-gray-50 transition-colors
                       last:border-b-0
                       data-[col='2']:border-r-0"
            data-col={index % 3} // Helper for styling
          >
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="h-10 object-contain mb-2"
            />
            <span className="text-sm font-medium text-gray-700">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- Main Sidebar Component ---
// This component renders the two brand cards.

const Sidebar = () => {
  const { brandName } = useParams();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/cars/brands`
        );
        const data = await response.json();
        // Filter out the current brand if we're on a brand page
        const filteredBrands = brandName
          ? data.filter((brand) => encodeURIComponent(brand) !== brandName)
          : data;
        setBrands(filteredBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [brandName]);

  // Transform brands array to match component expectations
  const transformBrands = (brandsArray) => {
    return brandsArray.map((brand) => ({
      name: brand,
      logoUrl: `https://placehold.co/100x60/f0f0f0/333?text=${encodeURIComponent(
        brand
      )}`,
    }));
  };

  const brandsData = transformBrands(brands);

  if (loading) {
    return (
      <aside className="w-full space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full space-y-6">
      {/* Card: Brands (using the reusable component) */}
      <BrandCard title="Brands" brands={brandsData} />

      {/* You could add more sidebar items here, like "Car Buyer's Tools" */}
    </aside>
  );
};

export default Sidebar;
