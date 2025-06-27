import api from "@shared/services/api.js"

// Este servicio nos trae las estadisticas para el diagrama de barras
export const GetEstadisticasProductoSemana = async () => {
    try {
        const response = await api.get("/productosSemana")
        if (response.data) {
            return response.data.data
        }
    } catch (error) {
        console.log(error)
    }
}

// Este servicio nos trae las estadisticas para el diagrama de pie
export const GetEstadisticasProductoTipo = async () => {
    try {
        const response = await api.get("/productosTipoSemana")
        if (response.data) {
            return response.data.data
        }
    } catch (error) {
        console.log(error)
    }
}

