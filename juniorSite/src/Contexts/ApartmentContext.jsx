import React, { createContext, useContext } from "react";
import apartmentsData from "../Data/apartments.json";

const ApartmentContext = createContext();

export const ApartmentProvider = ({ children }) => {
  return (
    <ApartmentContext.Provider value={{ apartments: apartmentsData }}>
      {children}
    </ApartmentContext.Provider>
  );
};

export const useApartments = () => useContext(ApartmentContext);
