import api from "@shared/services/api.js"
import { HttpStatusCode } from "axios"




// ESTE SERVCIO PERMITE REGISTRAR UN PRODUCTO HACIENDO USO DE LA API
export const RegistrarProducto = async (data) => {
  // SE HACE EL LLAMADO A LA API
  try {
    await api.post("/productos/crear", data)
    return true
  }


  catch (err) {
    // Si hay respuesta del servidor
    console.log(err)
    switch (err.response.status) {
      case HttpStatusCode.UnprocessableEntity:
        throw new Error(err.response.data.error);
      case HttpStatusCode.Conflict:
        throw new Error(err.response.data.error)
      default:
        throw new Error("Error en el servidor, vuelve a intentarlo más tarde");
    }
  }
}

// Este servicio nos permite obtener la informacion de las entradas de productos
export const GetRegistrosEntradaProducto = async () => {

  // Se hace el llamado a la api
  try {
    const response = await api.get("/registroEntradaProductos")
    if (response.data.data) {
      return response.data.data
    }
    return []
  }

  // En caso de errores se manejan los errores
  catch (err) {
    // Devolvemos un mensaje de error dependiendo del estado de la peticion
    switch (err.response.status) {
      case HttpStatusCode.InternalServerError:
        throw new Error("No eres tu somo nosotros, tenemos problemas de conexion vuelve a intentarlo mas tarde!")
    }
  }

}

// Este servicio nos permite obtener eliminar un producto en la base de datos
export const deleteProducto = async (numeroRegistroProducto) => {

  // Se hace el llamado a la api
  try {
    await api.delete(`/productos/${numeroRegistroProducto}`)
    return true
  }

  // En caso de errores se envia un mensaje personalizado dependiendo del estado devuelto
  catch (err) {
    switch (err.response.status) {
      case HttpStatusCode.NotFound:
        throw new Error("Este producto ya ha sido eliminado, intenta recargar la pagina si lo sigues viendo")
      case HttpStatusCode.InternalServerError:
        throw new Error("No eres tu comos nosotros, hubo en error de nuestra parte vuelve a intentarlo!")
    }
  }
}
