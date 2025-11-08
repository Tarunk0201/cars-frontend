import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import demo from "../../assets/demo.avif";
import placeholderImage from "../../assets/demo.avif";

import astonMartin from "../../assets/home/AstonMartin.png";
import bmwM4 from "../../assets/home/BMWM4.png";
import bugattiChiron from "../../assets/home/BugattiChiron.png";
import ferrari from "../../assets/home/Farrari.png";
import koenigsegg from "../../assets/home/Koenigsegg.png";
import lamborghiniHuracan from "../../assets/home/LamborghiniHuracán.png";
import lamborghini from "../../assets/home/Lamborghini.png";
import maseratiMC20 from "../../assets/home/MaseratiMC20.png";
import mercedes from "../../assets/home/Mercedes.png";
import pagani from "../../assets/home/Pagani.png";
import porsche from "../../assets/home/Porsche.png";
import FordGT from "../../assets/home/FordGT.png";
import BentleyContinentalGT from "../../assets/home/BentleyContinentalGT.png";
import DodgeViper from "../../assets/home/DodgeViper.png";
import RollsRoycePhantom from "../../assets/home/RollsRoycePhantom.png";
import McLarenSpeedtail from "../../assets/home/McLarenSpeedtail.png";
import HennesseyVenomF5 from "../../assets/home/HennesseyVenomF5.png";
import SSCTuatara from "../../assets/home/SSCTuatara.png";
import KoenigseggAgeraRS from "../../assets/home/KoenigseggAgeraRS.png";

import BentleyFlyingSpur from "../../assets/home/BentleyFlyingSpur.png";
import RollsRoyceCullinan from "../../assets/home/RollsRoyceCullinan.png";
import MercedesMaybachSClass from "../../assets/home/MercedesMaybachSClass.png";
import BMW7Series from "../../assets/home/BMW7Series.png";
import MercedesBenzSClass from "../../assets/home/MercedesBenzSClass.png";
import RangeRoverSVAutobiography from "../../assets/home/RangeRoverSVAutobiography.png";
import AudiA8LHorch from "../../assets/home/AudiA8LHorch.png";
import LexusLS500h from "../../assets/home/LexusLS500h.png";
import BentleyBentayga from "../../assets/home/BentleyBentayga.png";

import AutomotiveChaos from "../../assets/home/AutomotiveChaos.png";
import KoenigseggCCXRTrevita from "../../assets/home/KoenigseggCCXRTrevita.png";
import BugattiDivo from "../../assets/home/BugattiDivo.png";
import MercedesMaybachExelero from "../../assets/home/MercedesMaybachExelero.png";
import BugattiCentodieci from "../../assets/home/BugattiCentodieci.png";
import RollsRoyceSweptail from "../../assets/home/RollsRoyceSweptail.png";
import PaganiZondaHPBarchetta from "../../assets/home/PaganiZondaHPBarchetta.png";
import BugattiLaVoitureNoire from "../../assets/home/BugattiLaVoitureNoire.png";
import RollsRoyceBoatTail from "../../assets/home/RollsRoyceBoatTail.png";
import PaganiHuayraCodalunga from "../../assets/home/PaganiHuayraCodalunga.png";

import {
  ChevronRight,
  MapPin,
  ChevronLeft,
  Wallet,
  Car,
  Fuel,
  Gauge,
  SlidersHorizontal,
  Search,
} from "lucide-react";

const trendingCarsData = [
  {
    id: 1,
    name: "Bugatti Chiron Super Sport 300+",
    modelName: "Chiron",
    image: bugattiChiron,
    tag: "Hypercar",
  },
  {
    id: 2,
    name: "Koenigsegg Jesko Absolut",
    modelName: "Jesko",
    image: koenigsegg,
    tag: "Hypercar",
  },
  {
    id: 3,
    name: "Pagani Huayra Roadster BC",
    modelName: "Huayra",
    image: pagani,
    tag: "Limited Edition",
  },
  {
    id: 4,
    name: "Ferrari SF90 Stradale",
    modelName: "SF90 Stradale",
    image: ferrari,
  },
  {
    id: 5,
    name: "Lamborghini Sián FKP 37",
    modelName: "Huracán",
    image: lamborghini,
    tag: "Limited Edition",
  },
  {
    id: 6,
    name: "Porsche 911 GT3 RS",
    modelName: "911 GT3 RS",
    image: porsche,
  },
  {
    id: 7,
    name: "Lamborghini Huracán STO",
    modelName: "Huracán",
    image: lamborghiniHuracan,
    tag: "Race Inspired",
  },
  {
    id: 8,
    name: "Aston Martin Valkyrie",
    modelName: "Valkyrie",
    image: astonMartin,
    tag: "Hypercar",
  },
  {
    id: 9,
    name: "Mercedes-AMG ONE",
    image: mercedes,
    modelName: "ONE",
    tag: "F1 Tech",
  },
  { id: 10, name: "Ford GT", modelName: "Ford GT", image: FordGT },
  {
    id: 11,
    name: "BMW M4 CSL",
    modelName: "M4",
    image: bmwM4,
    tag: "Limited Edition",
  },
  { id: 12, name: "Maserati MC20", modelName: "MC20", image: maseratiMC20 },
];

const largeEngineCars = [
  {
    id: 1,
    name: "Bugatti Chiron",
    modelName: "Chiron",
    image: bugattiChiron,
    iconicFeature: "8.0L W16 Quad-Turbo",
  },
  {
    id: 2,
    name: "Dodge Viper",
    modelName: "Viper",
    image: DodgeViper,
    iconicFeature: "8.4L V10",
  },
  {
    id: 3,
    name: "Rolls-Royce Phantom",
    modelName: "Phantom",
    image: RollsRoycePhantom,
    iconicFeature: "6.75L V12 Twin-Turbo",
  },
  {
    id: 4,
    name: "Ferrari 812 Competizione",
    modelName: "812 Competizione",
    image: ferrari,
    iconicFeature: "6.5L V12 NA",
  },
  {
    id: 5,
    name: "Lamborghini Aventador SVJ",
    modelName: "Aventador SVJ",
    image: lamborghini,
    iconicFeature: "6.5L V12 NA",
  },
  {
    id: 6,
    name: "Aston Martin Valkyrie",
    modelName: "Valkyrie",
    image: astonMartin,
    iconicFeature: "6.5L V12 NA",
  },
  {
    id: 7,
    name: "Pagani Huayra",
    modelName: "Huayra",
    image: pagani,
    iconicFeature: "6.0L V12 Twin-Turbo (AMG)",
  },
  {
    id: 8,
    name: "Mercedes-Maybach S680",
    modelName: "ONE",
    image: mercedes,
    iconicFeature: "6.0L V12 Twin-Turbo",
  },
  {
    id: 9,
    name: "Bentley Continental GT Speed",
    modelName: "Continental GT",
    image: BentleyContinentalGT,
    iconicFeature: "6.0L W12 Twin-Turbo",
  },
];

const fastestCars = [
  {
    id: 1,
    name: "Bugatti Chiron Super Sport 300+",
    modelName: "Chiron",
    image: bugattiChiron,
    iconicFeature: "490.48 km/h (304.77 mph)",
    zeroToHundred: "2.4 seconds",
  },
  {
    id: 2,
    name: "Koenigsegg Jesko Absolut",
    modelName: "Jesko",
    image: koenigsegg,
    iconicFeature: "Claimed 531+ km/h (330+ mph)",
    zeroToHundred: "N/A (Estimated ~2.5s)",
  },
  {
    id: 3,
    name: "SSC Tuatara",
    modelName: "Tuatara",
    image: SSCTuatara,
    iconicFeature: "475 km/h (295 mph)",
    zeroToHundred: "2.5 seconds",
  },
  {
    id: 4,
    name: "Hennessey Venom F5",
    modelName: "Venom F5",
    image: HennesseyVenomF5,
    iconicFeature: "Claimed 500+ km/h (311+ mph)",
    zeroToHundred: "2.6 seconds",
  },
  {
    id: 5,
    name: "McLaren Speedtail",
    modelName: "Speedtail",
    image: McLarenSpeedtail,
    iconicFeature: "403 km/h (250 mph)",
    zeroToHundred: "3.0 seconds",
  },
  {
    id: 6,
    name: "Koenigsegg Agera RS",
    modelName: "Agera",
    image: KoenigseggAgeraRS,
    iconicFeature: "447.19 km/h (277.87 mph)",
    zeroToHundred: "2.8 seconds",
  },
];

const luxuryCars = [
  {
    id: 1,
    name: "Rolls-Royce Phantom",
    modelName: "Phantom",
    image: RollsRoycePhantom,
    iconicFeature: "Starlight Headliner",
  },
  {
    id: 2,
    name: "Bentley Flying Spur",
    modelName: "Flying Spur",
    image: BentleyFlyingSpur,
    iconicFeature: "Diamond Knurling",
  },
  {
    id: 3,
    name: "Mercedes-Maybach S-Class",
    modelName: "S-Class",
    image: MercedesMaybachSClass,
    iconicFeature: "Executive Rear",
  },
  {
    id: 4,
    name: "Rolls-Royce Cullinan",
    modelName: "Cullinan",
    image: RollsRoyceCullinan,
    iconicFeature: "Viewing Suite",
  },
  {
    id: 5,
    name: "Bentley Bentayga",
    modelName: "Bentayga",
    image: BentleyBentayga,
    iconicFeature: "Breitling Clock",
  },
  {
    id: 6,
    name: "BMW 7 Series (latest gen)",
    modelName: "7 Series (G70)",
    image: BMW7Series,
    iconicFeature: "Theatre Screen",
  },
  {
    id: 7,
    name: "Mercedes-Benz S-Class (latest gen)",
    modelName: "S-Class (W223)",
    image: MercedesBenzSClass,
    iconicFeature: "MBUX Hyperscreen",
  },
  {
    id: 8,
    name: "Range Rover SVAutobiography",
    modelName: "Range Rover SV (Successor to SVAutobiography)",
    image: RangeRoverSVAutobiography,
    iconicFeature: "Signature Suite",
  },
  {
    id: 9,
    name: "Audi A8 L Horch (China-specific, but notable)",
    modelName: "A8 L Horch",
    image: AudiA8LHorch,
    iconicFeature: "Horch Luxury",
  },
  {
    id: 10,
    name: "Lexus LS 500h",
    modelName: "LS 500h",
    image: LexusLS500h,
    iconicFeature: "Takumi Craftsmanship",
  },
];

const mostExpensiveCars = [
  {
    id: 1,
    name: "Rolls-Royce Boat Tail",
    modelName: "Boat Tail",
    image: RollsRoyceBoatTail,
    iconicFeature: "Approx. $28 Million USD",
  },
  {
    id: 2,
    name: "Bugatti La Voiture Noire",
    modelName: "La Voiture Noire",
    image: BugattiLaVoitureNoire,
    iconicFeature: "Approx. $18.7 Million USD",
  },
  {
    id: 3,
    name: "Pagani Zonda HP Barchetta",
    modelName: "Zonda",
    image: PaganiZondaHPBarchetta,
    iconicFeature: "Approx. $17.5 Million USD",
  },
  {
    id: 4,
    name: "SP Automotive Chaos",
    modelName: "Chaos",
    image: AutomotiveChaos,
    iconicFeature: "Claimed $14.4 Million USD (Ultra Version)",
  },
  {
    id: 5,
    name: "Range Rover SVAutobiography",
    modelName: "Range Rover SV (Successor to SVAutobiography)",
    image: RangeRoverSVAutobiography,
    iconicFeature: "Approx. $13 Million USD",
  },
  {
    id: 6,
    name: "Bugatti Centodieci",
    modelName: "Centodieci",
    image: BugattiCentodieci,
    iconicFeature: "Approx. $9 Million USD",
  },
  {
    id: 7,
    name: "Mercedes-Maybach Exelero",
    modelName: "Exelero",
    image: MercedesMaybachExelero,
    iconicFeature: "Approx. $8 Million USD",
  },
  {
    id: 8,
    name: "Pagani Huayra Codalunga",
    modelName: "Huayra",
    image: PaganiHuayraCodalunga,
    iconicFeature: "Approx. $7.4 Million USD",
  },
  {
    id: 9,
    name: "Bugatti Divo",
    modelName: "Divo",
    image: BugattiDivo,
    iconicFeature: "Approx. $5.8 Million USD",
  },
  {
    id: 10,
    name: "Koenigsegg CCXR Trevita",
    modelName: "CCXR Trevita",
    image: KoenigseggCCXRTrevita,
    iconicFeature: "Approx. $4.8 Million USD",
  },
];

const budgetTabs = [
  { id: "engineSize", label: "Engine size", data: largeEngineCars },
  { id: "topSpeed", label: "Top Speed", data: fastestCars },
  { id: "Luxury", label: "Luxury Cars", data: luxuryCars },
  { id: "Expensive", label: "Most Expensive", data: mostExpensiveCars },
];

const TrendingCarCard = ({ car, onClick }) => (
  <div
    onClick={() => onClick(car)}
    className="shrink-0 overflow-hidden w-[230px] h-[75px] p-2 flex flex-row items-center border border-gray-200 rounded-lg hover:shadow-md transition duration-200 cursor-pointer relative"
  >
    {car.tag && (
      <span className="absolute top-0 left-0 text-xs bg-gray-600 text-white px-2 py-0.5 rounded-br-lg rounded-tl-lg">
        {car.tag}
      </span>
    )}
    <img
      src={car.image || "https://via.placeholder.com/100x60?text=Car+Image"} // Fallback placeholder
      alt={car.name}
      className="w-24 h-auto object-contain"
    />
    <p className="mt-2 text-sm font-medium text-gray-800">{car.name}</p>
  </div>
);

// Card for Cars By Budget Section
const CarCard = ({ car, onClick }) => (
  <div className="p-3 border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition duration-300 w-60 shrink-0">
    <img
      src={car.image || "https://via.placeholder.com/200x120?text=Car+Image"} // Fallback placeholder
      alt={car.name}
      className="w-full h-32 object-contain mb-3"
    />
    <h4 className="text-lg font-semibold text-gray-900 truncate">{car.name}</h4>
    <p className="text-sm font-bold text-gray-700 mt-1">{car.iconicFeature}</p>
    <button
      onClick={() => onClick(car)}
      className="text-sm text-teal-500 font-medium mt-2 hover:text-teal-600 transition"
    >
      All Details
    </button>
  </div>
);

// ==============================
// 3. MAIN COMPONENT
// ==============================

const CarSections = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(budgetTabs[0].id);
  const trendingScrollRef = useRef(null);
  const budgetScrollRef = useRef(null);

  const activeTabData =
    budgetTabs.find((tab) => tab.id === activeTab)?.data || [];

  // Function to handle horizontal scrolling for carousels
  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCarClick = (car) => {
    // Extract brand name from the car name or use a default mapping
    const brandName = car.name.split(" ")[0]; // Simple extraction, e.g., "Bugatti" from "Bugatti Chiron"
    navigate(`/cars/${brandName}/${car.modelName}`);
    window.scrollTo(0, 0);
  };

  // Restore scroll position on component mount
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("homeScrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  // Save scroll position on scroll
  useEffect(() => {
    const handleScroll = () => {
      localStorage.setItem("homeScrollPosition", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ------------------------------------- */}
      {/* SECTION 1: Trending Cars (Carousel) */}
      {/* ------------------------------------- */}
      <div className="p-4 bg-white rounded-lg shadow-md mb-8">
        <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
          <span className="text-teal-500 mr-2">•</span> Trending Cars
        </h3>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollCarousel(trendingScrollRef, "left")}
            className="absolute left-0 top-1/2 transform -translate-y-[calc(50%+8px)] z-10 p-2 bg-white rounded-full shadow-lg border border-gray-100 hidden sm:flex items-center justify-center opacity-70 hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Carousel Content */}
          <div
            ref={trendingScrollRef}
            className="flex space-x-4 overflow-x-scroll pb-4 scrollbar-hide"
          >
            {trendingCarsData.map((car) => (
              <TrendingCarCard
                key={car.id}
                car={car}
                onClick={handleCarClick}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel(trendingScrollRef, "right")}
            className="absolute right-0 top-1/2 transform -translate-y-[calc(50%+8px)] z-10 p-2 bg-white rounded-full shadow-lg border border-gray-100 hidden sm:flex items-center justify-center opacity-70 hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* ------------------------------------- */}
      {/* SECTION 2: Cars by  (Tabs) */}
      {/* ------------------------------------- */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Cars by -</h2>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {budgetTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-base font-medium whitespace-nowrap transition-colors duration-200 
                ${
                  tab.id === activeTab
                    ? "text-teal-500 border-b-2 border-teal-500"
                    : "text-gray-600 hover:text-gray-800"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Car Cards Display (Carousel) */}
        <div className="relative">
          <div
            ref={budgetScrollRef}
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            {activeTabData.map((car) => (
              <CarCard key={car.id} car={car} onClick={handleCarClick} />
            ))}
          </div>

          {/* Right Arrow for Card Carousel */}
          <button
            onClick={() => scrollCarousel(budgetScrollRef, "right")}
            className="absolute right-0 top-1/2 transform -translate-y-[calc(50%+8px)] z-10 p-2 bg-white rounded-full shadow-lg border border-gray-100 hidden sm:flex items-center justify-center opacity-70 hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-sm text-gray-600 flex justify-between items-center flex-wrap">
          <button className="flex items-center text-teal-500 font-medium hover:text-teal-600 transition">
            All Cars
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarSections;
