import { Input, Button, CustomTextArea } from "@shared/components"
import { useForm } from "react-hook-form"
import { RegistrarOrganismo } from "../../services"
import { TrashIcon, CheckIcon } from "@shared/iconos"
import Swal from "sweetalert2"
import styles from "./RegistroOrganismo.module.css"

export const RegistroOrganismo = ({ onClose, numeroRegistroProducto }) => {
  // Se importa el hook useForm de react-hook-form para manejar el formulario
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Se define la función onSubmit que se ejecutará al enviar el formulario
  const onSubmit = (data) => {

    const payload = {
      nombreMicroorganismo: data.nombreMicroorganismo,
      cantidadMuestra: data.cantidadMuestra,
      metodoUsado: data.metodoUsado,
      especificacion: data.especificacion,
      tratamiento: data.tratamiento,
      volumenDiluyente: data.volumenDiluyente,
      numeroRegistroProducto: numeroRegistroProducto
    }
    // Se muestra un modal de confirmación antes de registrar el Microorganismo
    Swal.fire({
      title: "¿Deseas registrar este Microorganismo?",
      text: "Verifica que la información sea correcta antes de continuar.",
      icon: "question",
      showCancelButton: true,
      heightAuto: false,
      scrollbarPadding: false,
    })
      .then(async (result) => {
        // Si el usuario confirma, se procede a registrar el Microorganismo
        if (result.isConfirmed) {

          // Se intenta registrar el Microorganismo utilizando el servicio RegistrarOrganismo
          try {
            console.log (payload)
            await RegistrarOrganismo(payload)

            Swal.fire({
              icon: "success",
              title: "Registro Exitoso",
              text: "El Microorganismo se ha registrado correctamente.",
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
              text: error.message || "No se pudo registrar el Microorganismo. Intenta de nuevo.",
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
          label="Nombre Microorganismo"
          id="nombreMicroorganismo"
          placeHolder="Ej: Escherichia coli"
          {...register("nombreMicroorganismo", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s()\/\-]+$/,
              message: "El nombre solo puede contener letras"
            }
          })}
          error={errors.nombreMicroorganismo}
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
              value: /^[\p{L}0-9-]+$/u,
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
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s()<>\-=\/.]+$/,
              message: "La especificación solo puede contener letras, números y espacios y algunos caracteres especiales como (), <>, - y /"
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
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s()\/\-]+$/,
              message: "El tratamiento solo puede contener letras, números y espacios y algunos caracteres especiales como (), <>, - y /"
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
              message: "Solo puede contener letras, números y espacios"
            }
          })}
          error={errors.volumenDiluyente}
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