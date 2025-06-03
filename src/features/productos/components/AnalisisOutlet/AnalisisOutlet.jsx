import { useEffect, useState } from "react"
import { GetProductAnalisys } from "../../services"
import { AnalisisCard } from "@shared/components"

import styles from "./AnalisisOutlet.module.css"

export const AnalisisOutlet = ({ numeroRegistroProducto }) => {

    const [analisis, setAnalisis] = useState({})

    // Carga de datos
    const loadAnalisis = async () => {
        try {

            const data = await GetProductAnalisys(numeroRegistroProducto)
            if (data) {
                setAnalisis(data)
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        loadAnalisis()
        console.log(analisis)
        console.log(analisis.pruebasRecuento)
    }, [])


    if (analisis.pruebasRecuento) {

        return (
            <div className={styles.cardsContainer}>
                {analisis.pruebasRecuento.map(prueba => (
                    <AnalisisCard title={prueba.nombreRecuento} status={prueba.estado} key={prueba.nombreRecuento}>
                        <span>Prueba Recuento</span>
                        <p><b>Tratamiento: </b>{prueba.tratamiento}</p>
                    </AnalisisCard>
                ))}
            </div>
        )
    }
}