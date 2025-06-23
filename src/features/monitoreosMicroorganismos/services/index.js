import api from "@shared/services/api"

// Este servicio permite obtener los monitoreos de una deteccion por id
export const GetMonitoreosDeteccionById = async (id) => {
  try {

    const response = await api.get(`/monitoreosDetecciones/detecciones/${id}`)
    if (response.data) {
      return response.data.data
    }
    return []

  } catch (error) {
    console.log(error)
    if (error.response.status) {
      switch(error.response.status) {
        case HttpStatusCode.InternalServerError:
          throw new Error(`Hubo un error del lado del servidor: ${error.response.data.error}`)
        case HttpStatusCode.NotFound:
          throw new Error(`No existe una deteccion con este id`)
      }
    }
    throw new Error("Lo sentimos, en este momento estamos teniendo problemas con el servidor, vuelve a intentarlo mas tarde")
  }
}