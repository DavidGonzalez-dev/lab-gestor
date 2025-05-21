import { Input, Button,CustomTextArea } from "@shared/components"
import { useForm } from "react-hook-form"
import { RegistrarPrecuento } from "../../services"
import Swal from "sweetalert2"

export const RegistroRecuento = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: "¿Deseas registrar este recuento?",
      text: "Verifica que la información sea correcta antes de continuar.",
      icon: "question",
      showCancelButton: true,
      heightAuto: false,
      scrollbarPadding: false,
    });

    if (result.isConfirmed) {
      try {
        await RegistrarPrecuento(data)

        Swal.fire({
          icon: "success",
          title: "Registro Exitoso",
          text: "El recuento se ha registrado correctamente.",
          heightAuto: false,
          scrollbarPadding: false,
        });

        onClose();
        reset();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudo registrar el recuento. Intenta de nuevo.",
          heightAuto: false,
          scrollbarPadding: false,
        });
      }
    }
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
        {...register("especificacion", { required: "Este campo es requerido" })}
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
            value: /^[a-zA-Z]+$/,
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
            message: "Debe contener un número seguido de unidad (ej: 10min, 5h)"
          }
        })}
        error={errors.tiempoDisolucion}
      />

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="buttonCancel" parentMethod={onClose}>Cancelar</Button>
        <Button type="submit" variant="buttonAccept">Aceptar</Button>
      </div>

    </form>
  );
};
