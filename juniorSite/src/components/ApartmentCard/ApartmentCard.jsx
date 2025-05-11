import React from "react";
import st from "./ApartmentCard.module.css";
import Pictures from "../../assets/ExamplePictureCard.jpg";

const ApartmentCard = ({ apartment }) => {
  const { type, address, rooms, bathrooms, garage, price } = apartment;
  return (
    <div className={st.card}>
      <div className={st.imageContainer}>
        <img
          src={apartment.imageUrl}
          alt="Apartamento"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className={st.info}>
        <span className={st.tipo}>{type}</span>
        <h3 className={st.endereco}>{address}</h3>
        <p className={st.detalhes}>
          {rooms} quartos, {bathrooms} banheiros, {garage} vagas
        </p>
        <span className={st.valor}>{price}</span>
      </div>
    </div>
  );
};

export default ApartmentCard;
