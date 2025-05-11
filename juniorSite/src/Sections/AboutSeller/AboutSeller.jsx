import React from "react";
import st from "./AboutSeller.module.css";
import Seller from "../../assets/Seller.png";

const AboutSeller = () => {
  return (
    <div className={st.container}>
      <header>
        <h1>Artur Pires Junior</h1>
      </header>
      <section className={st.imgAndDescription}>
        <img className={st.img} src={Seller} alt="" />
        <div className={st.description}>
          <h2>Descrição do locador</h2>
          <p>
            Esse plano está excelente — bem estruturado, prático e moderno! Ele
            cobre tanto o front quanto o back com boas sugestões de ferramentas
            e uma ordem de desenvolvime
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutSeller;
