import api from "@shared/services/api";
import { HttpStatusCode } from "axios";

// Este servicio nos permite registrar un fabricante en la base de datos
export const registrarFabricante = async (data) => {
  // Se intenta hacer el envio de la informacion
  try {
    await api.post("/fabricantes/registrar", data);
    return true;
  } catch (err) {
    // En caso de haber un error retornamos un mensaje de errr teniendo en cuenta el codigo de estado de la respuesta
    console.log(err);
    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error);

      default:
        throw new Error(
          "No es culpa tuya es culpa nuestra, en este momento el sistema esta en mantenimiento!"
        );
    }
  }
};

// Este servicio nos permite traer a todos los Fabricantes
export const getFabicantes = async (data) => {
  // Se intenta hacer el envio de la informacion
  try {
    const fabricantes = await api.get("/fabricantes", data);
    return fabricantes.data.data;
  } catch (err) {
    // En caso de haber un error retornamos un mensaje de errr teniendo en cuenta el codigo de estado de la respuesta
    console.log(err);
    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error("Hubo un error al crear el usuario");
      default:
        throw new Error(
          "No es culpa tuya es culpa nuestra, en este momento el sistema esta en mantenimiento!"
        );
    }
  }
};

// Este servicio nos permite elmiminar un fabricante de la base de datos
export const eliminarFabricante = async (id) => {
  try {
    await api.delete(`/fabricantes/${id}`);
    return true;
  } catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.NotFound:
        throw new Error(
          "El fabricante ya ha sido eliminado de la base de datos del sistema, intenta recargar la pagina para reflejar los cambios!"
        );
      case HttpStatusCode.Conflict:
        throw new Error(
          "Este fabricante tiene actualmente productos relacionados, por ende no se puede borrar."
        );
    }
  }
};
export const getIdmarker = async (id) => {
  try {
    const response = await api.get(`fabricantes/${id}`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    // Si ocurre un error se maneja
    switch (error.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("Hubo un error al obtener el cliente");
    }
  }
};

//Este servicio sirve para poder actualizar la informacion de un cliente
export const Editmarker = async (data) => {
  console.log(data);
  try {
    await api.put(`fabricantes/actualizar`, data);
    return true;
  } catch (err) {
    console.log(err);

    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error);
      default:
        console.log(data);
        throw new Error("Error en el servidor vuelve a intentarlo mas tarde");
    }

    return false;
  }
};
