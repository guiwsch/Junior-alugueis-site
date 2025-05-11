import React from "react";
import HeroSection from "../Sections/HeroSection/HeroSection";
import AboutSeller from "../Sections/AboutSeller/AboutSeller";
import ApartmentSell from "../Sections/ApartmentSell/ApartmentSell";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSeller />
      <ApartmentSell />
    </div>
  );
};

export default HomePage;
