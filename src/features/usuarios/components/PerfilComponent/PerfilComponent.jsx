import { DetalleUsuario } from "../UserCard/UserCard"
import { ComponentLoader } from "@shared/components"

import useAuthStore from "@shared/stores/useAuthStore"
import { getUsuarioID } from "../../services"
import { useEffect, useState } from "react"

export const PerfilCard = () => {

    const { userId } = useAuthStore()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // Logica para cargar la informacion del usuario
    const loadData = async () => {

        try {
            setIsLoading(true)
            const data = await getUsuarioID(userId)
            setUserData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (userId) {
            loadData()
        }
    }, [userId])

    if (isLoading) {
        return <ComponentLoader />
    }

    if (!userData) {
        return <p>No hay informacion para este usuario</p>
    }

    return (
        <DetalleUsuario usuario={userData} />
    )
}