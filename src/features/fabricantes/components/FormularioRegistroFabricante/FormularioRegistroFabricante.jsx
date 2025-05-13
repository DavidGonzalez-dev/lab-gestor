import { Button, Input } from "@shared/components/"
import { CheckIcon, TrashIcon } from "@shared/iconos"
import { useForm } from "react-hook-form"
import { registrarFabricante } from "../../services"
import Swal from "sweetalert2"

import styles from "./FormularioRegistroFabricante.module.css"

const FormularioRegistroFabricante = () => {

    // Inicializamos el estado del formulario
    const { register, handleSubmit, formState: { errors } } = useForm()


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
                    {...register("nombre", { required: "El nombre es obligatorio*" })}
                />


                {/* Input para la direccion del Fabricante */}
                <Input
                    id={"direccion"}
                    type={"text"}
                    label={"Direccion del Fabricante"}
                    placeHolder={"Direccion Fabricante"}
                    error={errors.direccion}
                    {...register("direccion", { required: "El direccion es obligatorio*" })}
                />
            </div>

            {/* Botones de Accion */}
            <div className={styles.actionButtons}>
                <Button variant={"buttonCancel"} parentMethod={() => window.location.href = "/fabricantes"}>Cancelar <TrashIcon /></Button>
                <Button variant={"buttonAccept"} type="submit" >Aceptar <CheckIcon /></Button>
            </div>
        </form>
    )
}

export default FormularioRegistroFabricante