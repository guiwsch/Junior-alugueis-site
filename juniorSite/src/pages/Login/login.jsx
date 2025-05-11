import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";
import styles from "./login.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        credentials
      );
      if (response.data.success) {
        login(); // Atualiza o estado de autenticação
        navigate("/admin"); // Redireciona para a tela de admin
      } else {
        setError("Usuário ou senha inválidos");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login Administrador</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Usuário"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Senha"
            className={styles.input}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
