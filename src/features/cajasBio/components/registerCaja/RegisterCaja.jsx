import { useForm } from "react-hook-form";
import { registrarCaja } from "../../services";
import { useState } from "react";

import { Input, Button, LoaderSpiner } from "@shared/components";
import { TrashIcon, CheckIcon } from "@shared/iconos";
import styles from "./RegisterCaja.module.css";

import Swal from "sweetalert2";

export const CajaRegister = ({ onClose, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },watch
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const fechayhoraIncubacion = watch("fechayhoraIncubacion")

  const onSubmit = (data) => {
    const payload = {
      ...data,
      idPruebaRecuento: parseInt(id),
    };
    console.log("Payload a enviar:", payload);

    Swal.fire({
      title: "¿Deseas registrar esta caja Bioburden?",
      text: "Verifica que la información sea correcta antes de continuar.",
      icon: "question",
      showCancelButton: true,
      heightAuto: false,
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          await registrarCaja(payload);
          Swal.fire({
            icon: "success",
            title: "Registro Exitoso",
            text: "La Caja Bioburden se ha registrado correctamente.",
            heightAuto: false,
            scrollbarPadding: false,
          }).then(() => {
            onClose();
            location.reload();
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              error.message ||
              "No se pudo registrar la caja Bioburden. Intenta de nuevo.",
            heightAuto: false,
            scrollbarPadding: false,
          });
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Contenedor de Inputs */}
      <div className={styles.inputContainer}>
        {/* Tipo */}
        <Input
          type="text"
          label="Tipo"
          id="tipo"
          placeHolder="Ej: Aerobio mesófilo"
          {...register("tipo", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s()\/\-]+$/,
              message:
                "Solo puede contener letras, números y algunos caracteres como () y -",
            },
          })}
          error={errors.tipo}
        />

        {/* Método de Siembra */}
        <Input
          type="text"
          label="Método de Siembra"
          id="metodoSiembra"
          placeHolder="Ej: Vertido en placa"
          {...register("metodoSiembra", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s()\/\-]+$/,
              message:
                "Solo puede contener letras, números y algunos caracteres como () y -",
            },
          })}
          error={errors.metodoSiembra}
        />

        {/* Medida Aritmética */}
        <Input
          type="text"
          label="Medida Aritmética"
          id="medidaAritmetica"
          placeHolder="Ej: 25 UFC/g"
          {...register("medidaAritmetica", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[0-9]+(\s)?[A-Za-zÁÉÍÓÚáéíóúÑñ\/]+$/,
              message: "Debe contener un número seguido de una unidad",
            },
          })}
          error={errors.medidaAritmetica}
        />

        {/* Fecha y hora de Incubación */}
        <Input
          type="datetime-local"
          label="Fecha y Hora de Incubación"
          id="fechayhoraIncubacion"
          {...register("fechayhoraIncubacion", {
            required: "Este campo es requerido",
          })}
          error={errors.fechayhoraIncubacion}
        />

        {/* Fecha y hora de Lectura */}
        <Input
          type="datetime-local"
          label="Fecha y Hora de Lectura"
          id="fechayhoraLectura"
          {...register("fechayhoraLectura", {
            required: "Este campo es requerido",
            validate: value => !fechayhoraIncubacion || new Date(value) > new Date(fechayhoraIncubacion) || "La fecha y hora de Lectura debe ser mayor a la de incubacion *",
          })}
          error={errors.fechayhoraLectura}
        />

        {/* Factor de Disolución */}
        <Input
          type="text"
          label="Factor de Disolución"
          id="factorDisolucion"
          placeHolder="Ej: 1/10"
          {...register("factorDisolucion", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[0-9]+\/[0-9]+$/,
              message: "Debe tener el formato numérico (ej: 1/10)",
            },
          })}
          error={errors.factorDisolucion}
        />
      </div>

      {/* Botones de acción */}
      <div className={styles.buttonContainer}>
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
