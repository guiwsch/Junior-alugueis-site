import React, { useState } from "react";
import { useApartments } from "../../Contexts/ApartmentContext";
import styles from "./apartmentform.module.css";

const ApartmentForm = ({ onAddApartment }) => {
  const { addApartment } = useApartments();

  const [formData, setFormData] = useState({
    type: "",
    address: "",
    rooms: "",
    bathrooms: "",
    garage: "",
    price: "",
    image: null,
  });
  const [successMessage, setSuccessMessage] = useState(false);

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleFormEdit = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      await addApartment(data);
      setSuccessMessage(true);
      setFormData({
        type: "",
        address: "",
        rooms: "",
        bathrooms: "",
        garage: "",
        price: "",
        image: null,
      });
      // Recarrega a página após 1.5 segundos para mostrar a mensagem
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar apartamento:", error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <input
          className={styles.input}
          name="type"
          value={formData.type}
          onChange={handleFormEdit}
          placeholder="Tipo"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.input}
          name="address"
          value={formData.address}
          onChange={handleFormEdit}
          placeholder="Endereço"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.input}
          name="rooms"
          type="number"
          value={formData.rooms}
          onChange={handleFormEdit}
          placeholder="Quartos"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.input}
          name="bathrooms"
          type="number"
          value={formData.bathrooms}
          onChange={handleFormEdit}
          placeholder="Banheiros"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.input}
          name="garage"
          type="number"
          value={formData.garage}
          onChange={handleFormEdit}
          placeholder="Garagem"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.input}
          name="price"
          value={formData.price}
          onChange={handleFormEdit}
          placeholder="Preço"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      <button className={styles.submitButton} type="submit">
        Cadastrar
      </button>
      {successMessage && (
        <div className={styles.successMessage}>
          Apartamento / Casa cadastrado
        </div>
      )}
    </form>
  );
};

export default ApartmentForm;
