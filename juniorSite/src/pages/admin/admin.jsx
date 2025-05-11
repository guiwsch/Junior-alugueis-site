import React, { useState, useEffect } from "react";
import axios from "axios";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import ApartmentForm from "../../components/ApartmentForm/ApartmentForm";
import styles from "./admin.module.css";
import { Link } from "react-router-dom";
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

  const handleDeleteApartment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/apartamentos/${id}`);
      setApartments((prev) => prev.filter((apt) => apt._id !== id));
    } catch (err) {
      console.error("Erro ao excluir apartamento:", err);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <Link to="/">
        <button>Voltar</button>
      </Link>
      <h1 className={styles.title}>Painel do Administrador</h1>
      <ApartmentForm onAddApartment={handleAddApartment} />
      <hr className={styles.divider} />
      <h2 className={styles.subtitle}>Apartamentos Cadastrados</h2>
      <div className={styles.apartmentsList}>
        {apartments.map((apartment) => (
          <div key={apartment._id} className={styles.cardContainer}>
            <ApartmentCard apartment={apartment} />
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteApartment(apartment._id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
