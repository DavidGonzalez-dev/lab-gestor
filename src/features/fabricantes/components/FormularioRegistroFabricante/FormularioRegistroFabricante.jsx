import { Button, Input } from "@shared/components/"
import { CheckIcon, TrashIcon } from "@shared/iconos"
import { useForm } from "react-hook-form"
import { registrarFabricante } from "../../services"
import Swal from "sweetalert2"

import styles from "./FormularioRegistroFabricante.module.css"
import { useState } from "react"

const FormularioRegistroFabricante = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false)


    // Definir logica de envio de datos
    const onSubmit = async (data) => {

        // Intentamos registrar el Fabricante
        Swal.fire({
            title: "¿Estas seguro que quieres crear este Fabricante?",
            icon: "warning",
            confirmButtonText: "Aceptar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red",
            heightAuto: false,
            scrollbarPadding: false,
        }).then(async (result) => {

            // Si el usuario ahce click en aceptar se crea el Fabricante
            if (result.isConfirmed) {
                //Se crea el Fabricante en la base de datos
                try {
                    setIsLoading(true)
                    const success = await registrarFabricante(data)
                    // Si se crea el usuario con exito se muestra una alerta
                    if (success) {
                        Swal.fire({
                            icon: "success",
                            title: "Se creo el Fabricante con exito",
                            heightAuto: false,
                            scrollbarPadding: false,
                        }).then(() => { window.location.href = "/fabricantes" })
                    }
                }
                // En caso de error se muestra el error desde el servidor
                catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Error al crear el Fabricante",
                        text: err.message, heightAuto: false,
                        scrollbarPadding: false,
                    })
                }
                finally {
                    setIsLoading(false)
                }
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.customForm}>
            <h2>Informacion del Fabricante</h2>
            <div className={styles.inputsContainer}>
                {/* Input para el nombre del Fabricante */}
                <Input
                    id={"nombreFabricante"}
                    type={"text"}
                    label={"Nombre del Fabricante"}
                    placeHolder={"Nombre Fabricante"}
                    error={errors.nombre}
                    {...register("nombre", {
                        required: "El nombre es obligatorio*",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                            message: "El nombre solo puede contener letras y espacios",
                        }
                    })}
                />


                {/* Input para la direccion del Fabricante */}
                <Input
                    id={"direccion"}
                    type={"text"}
                    label={"Direccion del Fabricante"}
                    placeHolder={"Direccion Fabricante"}
                    error={errors.direccion}
                    {...register("direccion", {
                        required: "El direccion es obligatorio*",
                        pattern: {
                            value: /^(cra|cr|calle|cl|av|avenida|transversal|tv|diag|dg|manzana|mz|circular|circ)[a-z]*\.?\s*\d+[a-zA-Z]?\s*(#|n°|no\.?)\s*\d+[a-zA-Z]?(?:[-]\d+)?$/,
                            message: "Ingrese una direccion valida, ej: Calle 45 #10-23",
                        }
                    })}
                />
            </div>

            {/* Botones de Accion */}
            <div className={styles.actionButtons}>
                <Button variant={"buttonCancel"} parentMethod={() => window.location.href = "/fabricantes"}>
                    Cancelar <TrashIcon />
                </Button>

                <Button variant={"buttonAccept"} type="submit" disabled={isLoading} >
                    {isLoading ? <LoaderSpiner /> : <>Aceptar <CheckIcon /></>}
                </Button>
            </div>
        </form>
    )
}

export default FormularioRegistroFabricante