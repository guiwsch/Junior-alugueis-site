import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Criação do contexto
const ApartmentContext = createContext();

// Hook personalizado para usar o contexto
export const useApartments = () => useContext(ApartmentContext);

// Componente provider que envolve a aplicação
export const ApartmentProvider = ({ children }) => {
  const [apartments, setApartments] = useState([]);

  // Função para buscar todos os apartamentos do backend
  const fetchApartments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/apartamentos"
      );
      setApartments(response.data);
    } catch (error) {
      console.error("Erro ao buscar apartamentos:", error);
    }
  };

  // Função para adicionar um novo apartamento
  const addApartment = async (apartmentData) => {
    try {
      await axios.post(
        "http://localhost:3001/api/apartamentos",
        apartmentData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await fetchApartments(); // recarrega todos os dados do banco
    } catch (error) {
      console.error("Erro ao adicionar apartamento:", error);
    }
  };

  // Carrega os apartamentos ao iniciar
  useEffect(() => {
    fetchApartments();
  }, []);

  return (
    <ApartmentContext.Provider
      value={{ apartments, fetchApartments, addApartment }}
    >
      {children}
    </ApartmentContext.Provider>
  );
};
