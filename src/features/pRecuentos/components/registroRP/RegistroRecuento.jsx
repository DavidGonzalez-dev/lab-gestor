import { set, useForm } from "react-hook-form"
import { RegistrarPrecuento } from "../../services"
import { useState } from "react"

import { Input, Button, CustomTextArea, LoaderSpiner } from "@shared/components"
import { TrashIcon, CheckIcon } from "@shared/iconos"

import Swal from "sweetalert2"
import styles from "./RegistroRecuento.module.css"

export const RegistroRecuento = ({ onClose, numeroRegistroProducto }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Se define la función onSubmit que se ejecutará al enviar el formulario
  const onSubmit = (data) => {

    const payload = {
      nombreRecuento: data.nombreRecuento,
      cantidadMuestra: data.cantidadMuestra,
      metodoUsado: data.metodoUsado,
      especificacion: data.especificacion,
      tratamiento: data.tratamiento,
      volumenDiluyente: data.volumenDiluyente,
      tiempoDisolucion: data.tiempoDisolucion,
      numeroRegistroProducto: numeroRegistroProducto
    }
    // Se muestra un modal de confirmación antes de registrar el recuento
    Swal.fire({
      title: "¿Deseas registrar este recuento?",
      text: "Verifica que la información sea correcta antes de continuar.",
      icon: "question",
      showCancelButton: true,
      heightAuto: false,
      scrollbarPadding: false,
    })
      .then(async (result) => {
        // Si el usuario confirma, se procede a registrar el recuento
        if (result.isConfirmed) {

          // Se intenta registrar el recuento utilizando el servicio RegistrarPrecuento
          try {
            setIsLoading(true)
            await RegistrarPrecuento(payload)

            Swal.fire({
              icon: "success",
              title: "Registro Exitoso",
              text: "El recuento se ha registrado correctamente.",
              heightAuto: false,
              scrollbarPadding: false,
            })
              .then(() => {
                onClose()
                location.reload()
              })
          }
          // Si ocurre un error, se captura y se muestra un mensaje de error
          catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message || "No se pudo registrar el recuento. Intenta de nuevo.",
              heightAuto: false,
              scrollbarPadding: false,
            });
          } finally {
            setIsLoading(false)
          }
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* Contenedor de Inputs */}
      <div className={styles.inputContainer}>

        {/* Nombre Recuento */}
        <Input
          type="text"
          label="Nombre Recuento"
          id="nombreRecuento"
          placeHolder="Nombre Recuento"
          {...register("nombreRecuento", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[\p{L}\s]+$/u,
              message: "El nombre solo puede contener letras"
            }
          })}
          error={errors.nombreRecuento}
        />

        {/* Cantidad Muestra */}
        <Input
          type="text"
          label="Cantidad Muestra"
          id="cantidadMuestra"
          placeHolder="Ej: 10mg, 5g"
          {...register("cantidadMuestra", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[0-9]+[a-zA-Z]+$/,
              message: "Debe contener un número seguido de una unidad (ej: 10mg)"
            }
          })}
          error={errors.cantidadMuestra}
        />

        {/* Método Empleado */}
        <Input
          type="text"
          label="Metodo Empleado"
          id="metodoUsado"
          placeHolder="Ej: MET-123"
          {...register("metodoUsado", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[\p{L}0-9\s-]+$/u,
              message: "Solo puede contener letras, números y guiones (-)"
            }
          })}
          error={errors.metodoUsado}
        />

        {/* Especificación */}
        <Input
          type="text"
          label="Especificación"
          id="especificacion"
          placeHolder="Especificación"
          {...register("especificacion", { required: "Este campo es requerido",
            pattern: {
              value: /^[\p{L}0-9\s<>=\/.,°%:-]+$/u,
              message: "La especificación solo puede contener letras, números o los siguientes caracteres: <>=/.,°%"
            }
           })}
          error={errors.especificacion}
        />

        {/* Tratamiento */}
        <CustomTextArea
          type="text"
          label="Tratamiento"
          id="tratamiento"
          placeHolder="Tratamiento"
          {...register("tratamiento", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[\p{L}0-9\s]+$/u,
              message: "El tratamiento solo puede contener letras, números y guiones (-)"
            }
          })}
          error={errors.tratamiento}
        />

        {/* Volumen Diluyente */}
        <Input
          type="text"
          label="Volumen Diluyente"
          id="volumenDiluyente"
          placeHolder="Ej: 100mL, Agua destilada"
          {...register("volumenDiluyente", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[0-9]+[a-zA-Z]+$/,
              message: "El volumen debe contener un número seguido de una unidad de volumen, por ejemplo: 5 ml o 10mL*"
            }
          })}
          error={errors.volumenDiluyente}
        />

        {/* Tiempo Disolución */}
        <Input
          type="text"
          label="Tiempo Disolución"
          id="tiempoDisolucion"
          placeHolder="Ej: 10min"
          {...register("tiempoDisolucion", {
            required: "Este campo es requerido*",
            pattern: {
              value: /^[0-9]+[a-zA-Z]+$/,
              message: "Debe contener un número seguido de unidad (ej: 10min, 5h)"
            }
          })}
          error={errors.tiempoDisolucion}
        />
      </div>

      {/* Botones de acción */}
      <div className={styles.buttonContainer}>
        <Button variant="buttonCancel" parentMethod={onClose}>Cancelar <TrashIcon /></Button>
        <Button type="submit" variant="buttonAccept" disabled={isLoading}>
          {isLoading ? <LoaderSpiner /> : <>Aceptar <CheckIcon /></>}
        </Button>
      </div>

    </form>
  );
}
