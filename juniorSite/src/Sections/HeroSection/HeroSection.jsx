import React from "react";
import st from "./HeroSection.module.css";
import MainButton from "../../components/Button/Button";
import image from "../../assets/FirstImage.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div
      className={st.container}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={st.overlay}></div> {/* <- Overlay escura */}
      <header>
        <h3>Artur Júnior Corretor de imóveis</h3>
        <Link to="/login">
          <MainButton label="Admin" />
        </Link>
        {showLogin && <Login onLogin={() => setShowLogin(false)} />}
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
