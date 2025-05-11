import React, { useState } from "react";
import { useApartments } from "../../Contexts/ApartmentContext";

const ApartmentForm = () => {
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
    await addApartment(formData);
    setFormData({
      type: "",
      address: "",
      rooms: "",
      bathrooms: "",
      garage: "",
      price: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="type"
        value={formData.type}
        onChange={handleFormEdit}
        placeholder="Tipo"
        required
      />
      <input
        name="address"
        value={formData.address}
        onChange={handleFormEdit}
        placeholder="Endereço"
        required
      />
      <input
        name="rooms"
        type="number"
        value={formData.rooms}
        onChange={handleFormEdit}
        placeholder="Quartos"
        required
      />
      <input
        name="bathrooms"
        type="number"
        value={formData.bathrooms}
        onChange={handleFormEdit}
        placeholder="Banheiros"
        required
      />
      <input
        name="garage"
        type="number"
        value={formData.garage}
        onChange={handleFormEdit}
        placeholder="Garagem"
        required
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleFormEdit}
        placeholder="Preço"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default ApartmentForm;
