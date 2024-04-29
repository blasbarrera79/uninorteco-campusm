import React, { useState, useEffect } from 'react';
import "../assets/css/HelpdeskForm.css";
import { request } from "@ombiel/aek-lib";
import categoriasData from '../assets/json/categorias.json'; // Importa el archivo JSON

const HelpdeskForm = () => {
  const initialFormData = {
    ubicacion: '',
    descripcion: '',
    ext: '',
    categorias: [],
    categoriaPrincipal: '',
    user: '' // Añade el campo para el usuario
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isSending, setIsSending] = useState(false);
  const [categoriasOptions, setCategoriasOptions] = useState({});

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

    // Carga las categorías del archivo JSON cuando se monta el componente
    setCategoriasOptions(categoriasData.categorias);
  }, []); // El segundo argumento [] asegura que se llame solo una vez, equivalente a componentDidMount()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoriaPrincipalChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, categoriaPrincipal: value, categorias: [] });
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

              <select name="categoriaPrincipal" value={formData.categoriaPrincipal} onChange={handleCategoriaPrincipalChange}>
                <option value="">--Categoria--</option>
                {Object.keys(categoriasOptions).map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>

              <br />
              <div className="categorias-container">
                {formData.categoriaPrincipal && categoriasOptions[formData.categoriaPrincipal].map((categoria, index) => (
                  <div key={index}>
                    <input type="checkbox" name="categorias" value={categoria} checked={formData.categorias.includes(categoria)} onChange={handleCategoriaChange} />
                    <span>{categoria}</span>
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
