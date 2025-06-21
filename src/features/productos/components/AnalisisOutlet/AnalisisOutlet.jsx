import { useEffect, useState } from "react"
import { GetProductAnalisys } from "../../services"
import { AnalisisCard, ComponentLoader, SelectButton } from "@shared/components"

import styles from "./AnalisisOutlet.module.css"

export const AnalisisOutlet = ({ numeroRegistroProducto }) => {

    const [analisis, setAnalisis] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [filtro, setFiltro] = useState("todos");

    const mostrarRecuentos = filtro === "todos" || filtro === "recuentos";
    const mostrarDetecciones = filtro === "todos" || filtro === "detecciones";

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


    if (isLoading) {
        return <ComponentLoader />
    }

    if (analisis) {

        return (
            <>
                 <div className={styles.selectTypeContainer}>
                    <SelectButton  selected={filtro === "todos"} variant="neutral" parentMethod={() => setFiltro("todos")}>
                        Todos
                    </SelectButton>
                    <SelectButton  selected={filtro === "recuentos"} variant="neutral" parentMethod={() => setFiltro("recuentos")}>
                        Recuentos
                    </SelectButton>
                    <SelectButton  selected={filtro === "detecciones"} variant="neutral" parentMethod={() => setFiltro("detecciones")}>
                        Detecciones
                    </SelectButton>
                </div>

                <div className={styles.cardsContainer}>
                    {mostrarRecuentos &&
                        analisis.pruebasRecuento &&
                        analisis.pruebasRecuento.map(prueba => (
                            <AnalisisCard
                                title={prueba.nombreRecuento}
                                status={prueba.estado}
                                key={prueba.id}
                                redirectFunction={() => window.location.href = `../recuentos/${prueba.id}`}
                            >
                                <span>Prueba Recuento</span>
                                <p><b>Tratamiento: </b>{prueba.tratamiento}</p>
                            </AnalisisCard>
                        ))}

                    {mostrarDetecciones &&
                        analisis.deteccionMicroorganismos &&
                        analisis.deteccionMicroorganismos.map(prueba => (
                            <AnalisisCard
                                title={prueba.nombreMicroorganismo}
                                status={prueba.estado}
                                key={prueba.id}
                                typeVariant="secondary"
                                redirectFunction={() => window.location.href = `../deteccionMicroorganismos/${prueba.id}`}
                            >
                                <span>Detección de Microorganismos</span>
                                <p><b>Tratamiento: </b>{prueba.tratamiento}</p>
                            </AnalisisCard>
                        ))}
                </div>
            </>
        )
    }
}