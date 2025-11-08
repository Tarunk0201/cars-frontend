import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CarSearchWidget from "./CarSearchWidget";

const carPng1 = "/1.png";
const carPng2 = "/2.png";
const carPng3 = "/3.png";

const carouselData = [
  {
    id: 1,
    name: "BMW M3 GTR",
    brandName: "BMW",
    modelname: "M3",
    slogan: "The Legend of the Racetrack.",
    carPng: carPng2,
    bgColor: "bg-[#044160]",
    details: "CLASS: TOURING CAR | YEARS: 2001-2005",
  },
  {
    id: 2,
    name: "Porsche 911 GT3 RS",
    brandName: "Porsche",
    modelname: "911 GT3 RS",
    slogan: "Engineered for the Road and the Race.",
    carPng: carPng1,
    bgColor: "bg-[#329F2E]",
    details: "CLASS: SPORTSCAR | YEARS: 2013-2016",
  },
  {
    id: 3,
    name: "Aston Martin Valkyrie",
    brandName: "Aston Martin",
    modelname: "Valkyrie",
    slogan: "The Legend of the Racetrack.",
    carPng: carPng3,
    bgColor: "bg-[#74B4FE]",
    details: "CLASS: Hypercar class | YEARS: February 2025 - Present",
  },
];

const SLIDE_INTERVAL = 5000;
const ANIMATION_DURATION = 1.2;

const AnimatedSlide = ({ car, onExploreClick }) => {
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const carVariants = {
    initial: { x: "100vw" },
    animate: { x: 0 },
    exit: { x: "-100vw" },
  };

  return (
    <motion.div
      key={car.id}
      className={`absolute inset-0 flex flex-col justify-end p-8 md:p-16 ${car.bgColor} transition-colors duration-700`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION_DURATION * 0.5 }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 z-10 w-full"
        style={{ top: "50%", transform: "translate(20%, -50%)" }}
      >
        <motion.img
          src={car.carPng}
          alt={car.name}
          className="w-full max-w-3xl mx-auto filter"
          style={{
            filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.5))",
          }}
          variants={carVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "tween", duration: ANIMATION_DURATION }}
        />
      </div>

      <motion.div
        className="absolute top-1/4 left-8 md:left-16 z-20 text-white font-inter"
        variants={textVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <p className="text-xl opacity-80 uppercase tracking-widest">
          {car.details}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mt-2">{car.name}</h1>
        <p className="text-2xl mt-4 max-w-md opacity-90">{car.slogan}</p>

        {/* Read More Button inspired by the Porsche example */}
        <div className="mt-8">
          <button
            onClick={() => onExploreClick(car)}
            className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-xl hover:bg-gray-100 transition duration-300"
          >
            Explore Vehicle
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = carouselData.length;

  // Function to move to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  }, [totalSlides]);

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  // Function to handle explore click
  const handleExploreClick = (car) => {
    const apiModelName = car.modelname;
    // Navigate to CarDetailPage with brandName and modelName
    navigate(`/cars/${car.brandName}/${car.modelname}`);
  };

  // Auto-slide effect using useEffect
  useEffect(() => {
    const intervalId = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[550px] flex flex-col items-center justify-end overflow-visible mb-32">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <AnimatedSlide
            key={carouselData[currentSlide].id}
            car={carouselData[currentSlide]}
            onExploreClick={handleExploreClick}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 text-white border border-white/30 hover:bg-white/30 transition duration-200"
        aria-label="Previous Slide"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 text-white border border-white/30 hover:bg-white/30 transition duration-200"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 z-30 flex space-x-2 pb-20">
        {carouselData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
          ></div>
        ))}
      </div>

      <div className="relative bottom-0 w-full z-30 transform translate-y-1/2">
        <CarSearchWidget />
      </div>
    </section>
  );
};

export default HeroSection;
