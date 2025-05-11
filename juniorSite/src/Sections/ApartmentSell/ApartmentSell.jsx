import React, { useState, useEffect } from "react";
import { useApartments } from "../../Contexts/ApartmentContext";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import st from "./ApartmentSell.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ArrowButton from "../../components/ArrowButton/ArrowButton";

const ApartmentSell = () => {
  const { apartments, fetchApartments } = useApartments();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const next = () => {
    if (apartments.length <= 3) return;
    setStartIndex((prevIndex) => (prevIndex + 1) % apartments.length);
  };

  const prev = () => {
    if (apartments.length <= 3) return;
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + apartments.length) % apartments.length
    );
  };

  const visibleApartments = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (startIndex + i) % apartments.length;
    visibleApartments.push(apartments[index]);
  }

  useEffect(() => {
    fetchApartments(); // Chama a função para buscar os apartamentos
  }, [fetchApartments]);

  return (
    <div className={st.container}>
      <header>
        <h1>Imóveis</h1>
        <h3>Á Venda</h3>
      </header>
      <div
        className={st.dump}
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
      >
        <ArrowButton
          onClick={prev}
          disabled={startIndex + itemsPerPage >= apartments.length}
          icon={IoIosArrowBack}
          className={st.arrowButton}
        />

        {visibleApartments
          .filter((apt) => apt && apt._id)
          .map((apt) => (
            <ApartmentCard key={apt._id} apartment={apt} />
          ))}

        <ArrowButton
          onClick={next}
          disabled={startIndex + itemsPerPage >= apartments.length}
          icon={IoIosArrowForward}
          className={st.arrowButton}
        />
      </div>
    </div>
  );
};

export default ApartmentSell;
