import api from "@shared/services/api";
import { HttpStatusCode } from "axios";

const VistaUsuarios = async () => {
  try {
    const response = await api.get("/usuarios");

    if (response.status >= 200 && response.status < 300) {
      console.log("Data de usuarios:", response.data);
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

export const RegistrarUsuario = async (data) => {

  try {
    const response = await api.post("/usuarios/registrar", data)
    if (response.status != HttpStatusCode.Created) {
      throw new Error(response)
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
