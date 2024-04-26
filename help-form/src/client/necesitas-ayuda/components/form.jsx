import React, { useState, useEffect } from 'react';
import "./HelpdeskForm.css";
import { request } from "@ombiel/aek-lib";

const HelpdeskForm = () => {
  const initialFormData = {
    ubicacion: '',
    descripcion: '',
    ext: '',
    categorias: []
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Función para obtener el nombre de usuario
    const getUser = () => {
      request.action("get-user").end((err, res) => {
        if (res && res.body) {
          const user = res.body.username;
          // Actualizar el estado con el nombre de usuario obtenido
          setFormData(prevState => ({ ...prevState, user }));
        }
      });
    };

    // Llamar a la función para obtener el nombre de usuario cuando se monta el componente
    getUser();
  }, []); // El segundo argumento [] asegura que se llame solo una vez, equivalente a componentDidMount()

  const categoriasOptions = [
    { value: "Servicios TIC", label: "Servicios TIC" },
    { value: "Sistemas de información", label: "Sistemas de información" },
    { value: "Cursos", label: "Cursos" },
    { value: "Pagina web o Portales uninorte", label: "Pagina web o Portales uninorte" },
    { value: "Software en sala de usuario", label: "Software en sala de usuario" },
    { value: "Navegación", label: "Navegación" },
    { value: "Correo electrónico", label: "Correo electrónico" },
    { value: "Carné", label: "Carné" },
    { value: "Otro", label: "Otro" }
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoriaChange = (event) => {
    const { value, checked } = event.target;
    const updatedCategorias = checked
      ? [...formData.categorias, value]
      : formData.categorias.filter(categoria => categoria !== value);
    setFormData({ ...formData, categorias: updatedCategorias });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSending(true);
      const { user } = formData; // Obtener el nombre de usuario del estado del formulario
      const emailContents = `
        <p>Se ha generado un nuevo caso de ayuda con la siguiente información:</p>
        <ul>
          <li><strong>Usuario:</strong> ${user}</li>
          <li><strong>Ubicación:</strong> ${formData.ubicacion}</li>
          <li><strong>Descripción:</strong> ${formData.descripcion}</li>
          <li><strong>Extensión o Teléfono:</strong> ${formData.ext}</li>
          <li><strong>Categorías:</strong> ${formData.categorias.join(', ')}</li>
        </ul>
      `;
      try {
        await request.action("send-email").send({ emailContents });
        window.alert('Correo enviado correctamente.');
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        window.alert('Error al enviar el correo. Inténtalo de nuevo.');
      } finally {
        setIsSending(false);
      }
    } else {
      window.alert("Por favor, complete todos los campos del formulario antes de enviar.");
    }
  };

  const validateForm = () => {
    const { ubicacion, descripcion, ext, categorias } = formData;
    return [ubicacion, descripcion, ext].every(field => field.trim() !== '') && categorias.length > 0;
  };

  return (
    <form id="formHelpdesk" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <fieldset>
              <label>Categorías</label>
              <div className="categorias-container">
                {categoriasOptions.map((option, index) => (
                  <div key={index}>
                    <input type="checkbox" name="categorias" value={option.value} checked={formData.categorias.includes(option.value)} onChange={handleCategoriaChange} />
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
              <label>Ubicación</label>
              <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange} placeholder="Bloque-piso-salón/oficina" />
              <label>Descripción</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} rows="5"></textarea>
              <label>Extensión o Teléfono</label>
              <input type="number" name="ext" value={formData.ext} onChange={handleInputChange} placeholder="Extensión o Teléfono" />
              <button type="submit" disabled={isSending}>{isSending ? "Enviando..." : "Enviar"}</button>
            </fieldset>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HelpdeskForm;
