import React from "react";
import st from "./HeroSection.module.css";
import MainButton from "../../components/Button/Button";

const HeroSection = () => {
  return (
    <div className={st.container}>
      <header>
        <h3>Artur Júnior Corretor de imóveis</h3>
      </header>
      <section>
        <h1>O melhor lugar é aqui.</h1>
        <h3>Santa Catarina - Brasil</h3>
      </section>

      <section className={st.SectionButtons}>
        <MainButton label="Alugue" variant="primary"></MainButton>
        <MainButton label="Compre" variant="secondary"></MainButton>
      </section>
    </div>
  );
};

export default HeroSection;
