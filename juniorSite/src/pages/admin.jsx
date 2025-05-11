import React, { useState } from "react";
import ApartmentCard from "../components/ApartmentCard/ApartmentCard";
import ApartmentForm from "../components/ApartmentForm/ApartmentForm";

const Admin = () => {
  const [apartments, setApartments] = useState([]);

  const handleAddApartment = (newApartment) => {
    setApartments((prev) => [...prev, newApartment]);
  };

  return (
    <div>
      <h1>Painel do Administrador</h1>
      <ApartmentForm onAddApartment={handleAddApartment} />
      <hr />
      <h2>Apartamentos cadastrados</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
