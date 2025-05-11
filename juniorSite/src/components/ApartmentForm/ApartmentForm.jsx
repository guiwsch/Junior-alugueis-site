import React, { useState } from "react";

const ApartmentForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    address: "",
    rooms: "",
    bathrooms: "",
    garage: "",
    price: "",
  });

  const handleFormEdit = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(`/api/user/cadastro`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      console.log(response.status);
      console.log(json);
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="type"
        value={formData.type}
        onChange={(e) => {
          handleFormEdit(e, "name");
        }}
        placeholder="Tipo"
        required
      />
      <input
        name="address"
        value={formData.address}
        onChange={(e) => {
          handleFormEdit(e, "name");
        }}
        placeholder="Endereço"
        required
      />
      <input
        name="rooms"
        value={formData.rooms}
        onChange={(e) => {
          handleFormEdit(e, "name");
        }}
        placeholder="Quartos"
        type="number"
        required
      />
      <input
        name="bathrooms"
        value={formData.bathrooms}
        onChange={(e) => {
          handleFormEdit(e, "name");
        }}
        placeholder="Banheiros"
        type="number"
        required
      />
      <input
        name="garage"
        value={formData.garage}
        onChange={(e) => {
          handleFormEdit(e, "name");
        }}
        placeholder="Garagem"
        type="number"
        required
      />
      <input
        name="price"
        value={formData.price}
        onChange={(e) => {
          handleFormEdit(e, "name");
        }}
        placeholder="Preço"
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default ApartmentForm;
