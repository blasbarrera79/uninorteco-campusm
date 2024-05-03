import React, { useState, useEffect } from 'react';
// import "../assets/css/HelpdeskForm.css";
import { request } from "@ombiel/aek-lib";
import categoriasData from '../assets/json/categorias.json'; // Importa el archivo JSON
import SelectComponent from './SelectComponent';
import CheckboxList from './CheckboxList';
import InputComponent from './InputComponent';
import TextAreaComponent from './TextAreaComponent';
import ButtonComponent from './ButtonComponent';

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
        <h1>Se ha generado un nuevo caso de ayuda con la siguiente información:</h1>
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
              <SelectComponent options={Object.keys(categoriasOptions)} value={formData.categoriaPrincipal} handleChange={handleCategoriaPrincipalChange} />
              <CheckboxList formData={formData} categoriasOptions={categoriasOptions} handleCategoriaChange={handleCategoriaChange} />
              <InputComponent 
                label="Ubicación" 
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                placeholder="Bloque-piso-salón/oficina" 
              />
              <TextAreaComponent
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del problema"
              />
              <InputComponent
                label="Extensión o Teléfono"
                name="ext"
                value={formData.ext}
                onChange={handleInputChange}
                type="number"
                placeholder="Extensión o Teléfono"
              />
              <ButtonComponent text={isSending ? "Enviando..." : "Enviar"} disabled={isSending} />
            </fieldset>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HelpdeskForm;
