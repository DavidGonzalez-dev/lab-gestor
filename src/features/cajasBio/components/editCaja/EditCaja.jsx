import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateCaja } from "../../services";
import { Input, Button, LoaderSpiner } from "@shared/components";
import { CheckIcon, TrashIcon } from "@shared/iconos";
import Swal from "sweetalert2";
import styles from "./EditCaja.module.css";

export const EditarCajaForm = ({ caja, onClose, onUpdated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },watch,
  } = useForm({
    defaultValues: {
      tipo: caja.tipo,
      metodoSiembra: caja.metodoSiembra,
      medidaAritmetica: caja.medidaAritmetica,
      resultado: caja.resultado,
      factorDisolucion: caja.factorDisolucion,
      fechayhoraIncubacion: caja.fechayhoraIncubacion?.slice(0, 16),
      fechayhoraLectura: caja.fechayhoraLectura?.slice(0, 16),
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const fechayhoraIncubacion = watch("fechayhoraIncubacion")

  const onSubmit = async (payload) => {
    const result = await Swal.fire({
      title: "¿Confirmar actualización de la caja?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      heightAuto: false,
      scrollbarPadding: false,
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);

        const payloadToSend = {
          ...payload,
          fechayhoraIncubacion: new Date(
            payload.fechayhoraIncubacion
          ).toISOString(),
          fechayhoraLectura: new Date(payload.fechayhoraLectura).toISOString(),
          idPruebaRecuento: parseInt(caja.idPruebaRecuento),
        };
        const success = await updateCaja(caja.id, payloadToSend);

        if (success) {
          await Swal.fire({
            icon: "success",
            title: "Caja actualizada correctamente",
            heightAuto: false,
            scrollbarPadding: false,
          });
          onUpdated();
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la caja",
          text: err.message,
          heightAuto: false,
          scrollbarPadding: false,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
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

        <Input
          type="datetime-local"
          label="Fecha y Hora de Incubación"
          id="fechayhoraIncubacion"
          {...register("fechayhoraIncubacion", {
            required: "Este campo es requerido",
          })}
          error={errors.fechayhoraIncubacion}
        />

        <Input
          type="datetime-local"
          label="Fecha y Hora de Lectura"
          id="fechayhoraLectura"
          {...register("fechayhoraLectura", {
            required: "Este campo es requerido",
            validate: value => !fechayhoraIncubacion || new Date(value) > new Date(fechayhoraIncubacion) || "La fecha y hora de Lectura debe ser mayor a la de incubacion *"
          })}
          error={errors.fechayhoraLectura}
        />

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

        <Input
          type="text"
          label="Resultado"
          id="resultado"
          placeHolder="Ej: 120 UFC"
          {...register("resultado", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[0-9]+(\s)?[A-Za-zÁÉÍÓÚáéíóúÑñ\/]+$/,
              message: "Debe contener un número seguido de una unidad",
            },
          })}
          error={errors.resultado}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Button variant="buttonCancel" parentMethod={onClose}>
          Cancelar <TrashIcon />
        </Button>
        <Button type="submit" variant="buttonAccept" disabled={isLoading}>
          {isLoading ? (
            <LoaderSpiner />
          ) : (
            <>
              Aceptar <CheckIcon />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
