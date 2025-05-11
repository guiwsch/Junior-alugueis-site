import React, { useState, useEffect } from "react";
import axios from "axios";
import ApartmentCard from "../components/ApartmentCard/ApartmentCard";
import ApartmentForm from "../components/ApartmentForm/ApartmentForm";

const Admin = () => {
  const [apartments, setApartments] = useState([]);

  const fetchApartments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/apartamentos"
      );
      setApartments(response.data);
    } catch (err) {
      console.error("Erro ao buscar apartamentos:", err);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

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
