import { request } from "@ombiel/aek-lib";
import { getEnlace } from "./links";
// Función para obtener los datos de las salas de usuario
export const fetchData = () => {
  return new Promise((resolve, reject) => {
    request
      .action("get-data")
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          const data = res.body.map((sala, index) => ({
            id: index + 1, // Asegurarse de que los IDs sean números enteros
            ...sala,
            enlace: getEnlace(index + 1) // Asignar enlaces utilizando la función de links.js
          }));
          resolve(data);
        }
      });
  });
};



