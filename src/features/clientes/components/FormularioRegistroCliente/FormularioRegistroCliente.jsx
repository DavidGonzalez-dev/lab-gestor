import { Button, Input, LoaderSpiner } from "@shared/components/"
import { CheckIcon, TrashIcon } from "@shared/iconos"
import Swal from "sweetalert2"

import { useForm } from "react-hook-form"
import { registrarCliente } from "../../services/"
import { useState } from "react"

import styles from "./FormularioRegistroCliente.module.css"

export const FormularioRegistroCliente = () => {

    // Inicializamos el estado del formulario
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false)


    // Definir logica de envio de datos
    const onSubmit = async (data) => {

        // Intentamos registrar el cliente
        Swal.fire({
            title: "¿Estas seguro que quieres crear este cliente?",
            icon: "warning",
            confirmButtonText: "Aceptar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red",
            heightAuto: false,
            scrollbarPadding: false,
        }).then(async (result) => {

            // Si el usuario ahce click en aceptar se crea el cliente
            if (result.isConfirmed) {
                //Se crea el cliente en la base de datos
                try {
                    setIsLoading(true)
                    const success = await registrarCliente(data)
                    // Si se crea el usuario con exito se muestra una alerta
                    if (success) {
                        Swal.fire({
                            icon: "success",
                            title: "Se creo el cliente con exito",
                            heightAuto: false,
                            scrollbarPadding: false,
                        }).then(() => { window.location.href = "/clientes" })
                    }
                }
                // En caso de error se muestra el error desde el servidor
                catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Error al crear el cliente",
                        text: err.message
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
            <h2>Informacion del Cliente</h2>
            <div className={styles.inputsContainer}>
                {/* Input para el nombre del cliente */}
                <Input
                    id={"nombreCliente"}
                    type={"text"}
                    label={"Nombre del Cliente"}
                    placeHolder={"Nombre cliente"}
                    error={errors.nombre}
                    {...register("nombre", { 
                        required: "El nombre es obligatorio*", 
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                            message: "El nombre solo puede contener letras y espacios*"
                        }})}
                />


                {/* Input para la direccion del cliente */}
                <Input
                    id={"direccion"}
                    type={"text"}
                    label={"Direccion del Cliente"}
                    placeHolder={"Direccion cliente"}
                    error={errors.direccion}
                    {...register("direccion", {
                        required: "El direccion es obligatorio*",
                        pattern: {
                            value: /(cra|cr|calle|cl|av|avenida|transversal|tv|diag|dg|manzana|mz|circular|circ)[a-z]*\.?\s*\d+[a-zA-Z]?\s*(#|n°|no\.?)\s*\d+[a-zA-Z]?(?:[-]\d+)?$/,
                            message: "Ingrese una direccion valida*"
                        }
                    })}
                />
            </div>

            {/* Botones de Accion */}
            <div className={styles.actionButtons}>
                <Button variant={"buttonCancel"} parentMethod={() => window.location.href = "/clientes"}>
                    Cancelar <TrashIcon />
                </Button>

                <Button variant={"buttonAccept"} type="submit" disabled={isLoading} >
                    {isLoading ? <LoaderSpiner /> : <>Aceptar <CheckIcon /></>}
                </Button>
            </div>
        </form>
    )
}