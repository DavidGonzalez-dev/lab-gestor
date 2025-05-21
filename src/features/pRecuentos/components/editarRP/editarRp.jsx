import { Input, Button, CustomTextArea } from "@shared/components";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CheckIcon, TrashIcon } from "@shared/iconos";
// import { EditarPrecuento } from "../../services";

export const EditarRp = ({ recuento, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nombreRecuento: recuento.nombreRecuento,
      cantidadMuestra: recuento.cantidadMuestra,
      metodoUsado: recuento.metodoUsado,
      especificacion: recuento.especificacion,
      tratamiento: recuento.tratamiento,
      volumenDiluyente: recuento.volumenDiluyente,
      tiempoDisolucion: recuento.tiempoDisolucion
    }
  });

  const onSubmit = async (data) => {
    Swal.fire({
      title: "¿Estás seguro que quieres actualizar este recuento?",
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
          // const success = await EditarPrecuento(recuento.id, data);
          const success = true; // simulado

          if (success) {
            Swal.fire({
              icon: "success",
              title: "Se actualizó el recuento con éxito",
              heightAuto: false,
              scrollbarPadding: false,
            }).then(() => { onClose() });
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

      <Input
        type="text"
        label="Cantidad Muestra"
        id="cantidadMuestra"
        placeHolder="Ej: 10mg"
        {...register("cantidadMuestra", {
          required: "Este campo es requerido",
          pattern: {
            value: /^[0-9]+[a-zA-Z]+$/,
            message: "Debe contener un número seguido de una unidad (ej: 10mg)"
          }
        })}
        error={errors.cantidadMuestra}
      />

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

      <Input
        type="text"
        label="Especificación"
        id="especificacion"
        placeHolder="Especificación"
        {...register("especificacion", {
          required: "Este campo es requerido"
        })}
        error={errors.especificacion}
      />

      <CustomTextArea
        type="text"
        label="Tratamiento"
        id="tratamiento"
        placeHolder="Tratamiento"
        {...register("tratamiento", {
          required: "Este campo es requerido",
          pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "El tratamiento solo puede contener letras"
          }
        })}
        error={errors.tratamiento}
      />

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

      <Input
        type="text"
        label="Tiempo Disolución"
        id="tiempoDisolucion"
        placeHolder="Ej: 10min"
        {...register("tiempoDisolucion", {
          required: "Este campo es requerido",
          pattern: {
            value: /^[0-9]+[a-zA-Z]+$/,
            message: "Debe contener un número seguido de unidad (ej: 10min)"
          }
        })}
        error={errors.tiempoDisolucion}
      />

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="buttonCancel" parentMethod={onClose}>
          Cancelar <TrashIcon />
        </Button>
        <Button type="submit" variant="buttonAccept">
          Aceptar <CheckIcon />
        </Button>
      </div>
    </form>
  );
};
