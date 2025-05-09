import api from "@shared/services/api";
import { HttpStatusCode } from "axios";

const VistaProductos = async () => {
  try {
    const response = await api.get("/productos");

    if (response.status >= 200 && response.status < 300) {
      console.log("Data de productos:", response.data);
      return Array.isArray(response.data.data) ? response.data.data : [];
    } else {
      console.log("Error en la respuesta", response.data);
      return [];
    }
  } catch (err) {
    console.error("Error en la peticion", err);
    if (err.response) {
      console.error("Detalles del error", err.response);
      console.error("Estado:", err.response.status);
    }
    return [];
  }
};

// Este servicio nos permite registrar un usaurio haciendo uso de la API
export const RegistrarProducto = async (data) => {

  try {
    // Se hace la llamada a la API
    const response = await api.post("/productos/registrar", data)

    // Se verifica que el usuario se halla creado
    if (response.status != HttpStatusCode.Created) {

      // En caso de que hubiera un problema se arroja un error
      throw new Error(response)
    }

    // En caso de que se halla creado se devuelve true
    return true

  } catch (error) {
    
    console.log(error)
    // En caso de haber un error se retorna falso
    return false
  }
}
