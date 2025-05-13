import api from "@shared/services/api.js";
import { HttpStatusCode } from "axios";

export const registrarCliente = async (data) => {
  // Se hace la llamada a la api
  try {
    await api.post("/clientes/registrar", data);
    return true;
  } catch (err) {
    // En caso de haber un error se gestiona y se envia un mensaje de error
    switch (err.response.status) {
      case HttpStatusCode.BadRequest:
        throw new Error(err.response.data.error);
    }
    return false;
  }
};

export const getClientes = async () => {
  // Se intenta hacer el llamado a la api
  try {
    const response = await api.get("/clientes");
    return response.data.data;
  }
    // En caso de haber un error se gestiona
    catch (err) {
        console.log(err)
    }
}

// Este servicio nos permite elmiminar un Cliente de la base de datos
export const eliminarCliente = async (id) => {
    try{
        await api.delete(`/clientes/${id}`)
        return true
    }
    catch (err) {
        switch(err.response.status) {
            case HttpStatusCode.NotFound:
                throw new Error("El cliente ya ha sido eliminado de la base de datos del sistema, intenta recargar la pagina para reflejar los cambios!")
            case HttpStatusCode.Conflict:
                throw new Error("Este cliente tiene actualmente productos relacionados, por ende no se puede borrar.")
        }
    }
}
    console.log(err);

export const getIdclient = async (id) => {
  try {
    const response = await api.get(`clientes/${id}`);
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
export const EditClient = async (data) => {
  console.log(data);
  try {
    await api.put(`clientes/actualizar`, data);
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
