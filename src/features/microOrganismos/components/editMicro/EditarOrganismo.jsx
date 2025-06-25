import { Input, Button, CustomTextArea } from "@shared/components";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CheckIcon, TrashIcon } from "@shared/iconos";
import { EditOrganismo } from "../../services";
import styles from "./EditarOrganismo.module.css"

export const EditarOrganismos = ({ data, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      metodoUsado: data.metodoUsado,
      concepto: data.concepto,
      especificacion: data.especificacion,
      volumenDiluyente: data.volumenDiluyente,
      cantidadMuestra: data.cantidadMuestra,
      tratamiento: data.tratamiento,
      nombreMicroorganismo: data.nombreMicroorganismo,
      numeroRegistroProducto: data.numeroRegistroProducto
    }
  });

  const onSubmit = async (payload) => {
    Swal.fire({
      title: "¿Estás seguro que quieres actualizar este Microorganismo?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      heightAuto: false,
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const success = await EditOrganismo(data.id,payload);
          if (success) {
            Swal.fire({
              icon: "success",
              title: "Se actualizó el Microorganismo con éxito",
              heightAuto: false,
              scrollbarPadding: false,
            }).then(() => location.reload());
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error al actualizar el recuento",
            text: err.message,
            heightAuto: false,
            scrollbarPadding: false,
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* Contenedor de Inputs */}
      <div className={styles.inputContainer}>

        {/* Nombre Recuento */}
        <Input
          type="text"
          label="Nombre Micro organismo"
          id="nombreMicroorganismo"
          placeHolder="Nombre Micro organismo"
          {...register("nombreMicroorganismo", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z]+$/,
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
      </div>

      {/* Botones de acción */}
      <div className={styles.buttonContainer}>
        <Button variant="buttonCancel" parentMethod={onClose}>Cancelar <TrashIcon /></Button>
        <Button type="submit" variant="buttonAccept">Aceptar <CheckIcon /></Button>
      </div>

    </form>
  );
};
