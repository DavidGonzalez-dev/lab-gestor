import { Input, Button, CustomTextArea } from "@shared/components"
import { useForm } from "react-hook-form"
import { RegistrarPrecuento } from "../../services"

import { TrashIcon, CheckIcon } from "@shared/iconos"

import Swal from "sweetalert2"
import styles from "./RegistroRecuento.module.css"

export const RegistroRecuento = ({ onClose, numeroRegistroProducto }) => {
  // Se importa el hook useForm de react-hook-form para manejar el formulario
  const { register, handleSubmit, formState: { errors } } = useForm();

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
              value: /^[a-zA-Z]+$/,
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
              value: /^[a-zA-Z0-9-]+$/,
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
          {...register("especificacion", { required: "Este campo es requerido" })}
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
              value: /^[a-zA-Z]+$/,
              message: "El tratamiento solo puede contener letras"
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
              value: /^[a-zA-Z0-9, ]+$/,
              message: "Solo puede contener letras, números, comas (,) y espacios"
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
            required: "Este campo es requerido",
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
        <Button type="submit" variant="buttonAccept">Aceptar <CheckIcon /></Button>
      </div>

    </form>
  );
}
