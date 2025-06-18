import { useEffect, useState } from "react"
import { GetProductAnalisys } from "../../services"
import { AnalisisCard, ComponentLoader } from "@shared/components"

import styles from "./AnalisisOutlet.module.css"

export const AnalisisOutlet = ({ numeroRegistroProducto }) => {

    const [analisis, setAnalisis] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    // Carga de datos
    const loadAnalisis = async () => {
        try {
            setAnalisis
            const data = await GetProductAnalisys(numeroRegistroProducto)
            if (data) {
                setAnalisis(data)
            }

        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadAnalisis()
    }, [])


    if(isLoading) {
        return <ComponentLoader />
    }

    if (analisis.pruebasRecuento) {
        return (
            <div className={styles.cardsContainer}>
                {analisis.pruebasRecuento.map(prueba => (
                    <AnalisisCard title={prueba.nombreRecuento} status={prueba.estado} key={prueba.id} redirectFunction={() => window.location.href = `../recuentos/${prueba.id}`}>
                        <span>Prueba Recuento</span>
                        <p><b>Tratamiento: </b>{prueba.tratamiento}</p>
                    </AnalisisCard>
                ))}
            </div>
        )
    }
}