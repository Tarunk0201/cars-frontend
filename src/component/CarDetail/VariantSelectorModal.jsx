import React from "react";
import { motion, AnimatePresence } from "framer-motion";


const VariantSelectorModal = ({ isOpen, onClose, variants = [], onSelect }) => {
  const [selectedFilters, setSelectedFilters] = React.useState({
    fuel: [], // e.g., ['Petrol', 'CNG']
    transmission: [], // e.g., ['Manual', 'Automatic']
  });

  // Handle filter button clicks
  const handleFilterClick = (type, value) => {
    setSelectedFilters((prevFilters) => {
      const currentValues = prevFilters[type];
      let newValues;
      if (currentValues.includes(value)) {
        // Remove value if already selected
        newValues = currentValues.filter((v) => v !== value);
      } else {
        // Add value if not selected
        newValues = [...currentValues, value];
      }
      return { ...prevFilters, [type]: newValues };
    });
  };

  // Filter the variants based on selected filters
  const filteredVariants = React.useMemo(() => {
    return variants.filter((variant) => {
      const fuelMatch =
        selectedFilters.fuel.length === 0 ||
        selectedFilters.fuel.includes(variant.fuel);
      const transmissionMatch =
        selectedFilters.transmission.length === 0 ||
        selectedFilters.transmission.includes(variant.transmission);
      return fuelMatch && transmissionMatch;
    });
  }, [variants, selectedFilters]);

  // Framer Motion variants for the modal animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
  };

  // Button style based on selection state
  const getButtonStyle = (type, value) => {
    const isSelected = selectedFilters[type].includes(value);
    return isSelected
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl bg-opacity-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close modal when clicking backdrop
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8 overflow-hidden flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            style={{ maxHeight: "85vh" }} // Limit height for scrollability
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Your Variant
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex flex-wrap gap-3">
                {/* Fuel Filters */}
                {["Petrol", "CNG", "Diesel"].map((fuel) => (
                  <button
                    key={fuel}
                    onClick={() => handleFilterClick("fuel", fuel)}
                    className={`px-4 py-2 text-sm font-medium border rounded-md transition ${getButtonStyle(
                      "fuel",
                      fuel
                    )}`}
                  >
                    {fuel}
                  </button>
                ))}
                {/* Transmission Filters */}
                {["Manual", "Automatic"].map((transmission) => (
                  <button
                    key={transmission}
                    onClick={() =>
                      handleFilterClick("transmission", transmission)
                    }
                    className={`px-4 py-2 text-sm font-medium border rounded-md transition ${getButtonStyle(
                      "transmission",
                      transmission
                    )}`}
                  >
                    {transmission}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant List */}
            <div className="p-5 overflow-y-auto grow">
              {filteredVariants.length > 0 ? (
                <ul className="space-y-4">
                  {filteredVariants.map((variant) => (
                    <li
                      key={variant.id}
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => {
                        onSelect(variant);
                        onClose();
                      }}
                    >
                      <div>
                        <h3 className="text-base font-semibold text-blue-600">
                          {variant.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {variant.fuel} | {variant.transmission}
                        </p>
                      </div>
                      <span className="text-base font-semibold text-gray-800">
                        {variant.price}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-6">
                  No variants match the selected filters.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VariantSelectorModal;
