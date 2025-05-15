import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Editmarker } from "../../services";
import { Input, Button } from "@shared/components";
import { CheckIcon, TrashIcon } from "@shared/iconos";
import React from "react";
import styles from "./editMarket.module.css";

export function EditMarketModal({ isOpen, onClose, fabricante }) {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: fabricante.ID,
      nombre: fabricante.nombre,
      direccion: fabricante.direccion,
    },
  });

  // Cuando cambia el fabricante, actualiza valores en el formulario
  React.useEffect(() => {
    if (fabricante) {
      reset({
        id: fabricante.id,
        nombre: fabricante.nombre,
        direccion: fabricante.direccion,
      });
    }
  }, [fabricante, reset]);

  const onSubmit = (data) => {
    Swal.fire({
      title: "¿Estas seguro de actualizar este fabricante?",
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
          const response = await Editmarker(data);
          if (response) {
            Swal.fire(
              "Se actualizó el fabricante con éxito!",
              "",
              "success"
            ).then(() => {
              window.location.href = "/fabricantes";
            });
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Ups! algo salió mal",
            text: err.message,
            heightAuto: false,
            scrollbarPadding: false,
          });
        }
      }
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar fabricante</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Nombre */}
          <Input
            type="text"
            label="Nombre"
            id="nombre"
            placeHolder="ej: Supermercado el Progreso"
            error={errors.nombre}
            {...register("nombre", {
              required: "El nombre es obligatorio*",
            })}
          />

          {/* Dirección */}
          <Input
            type="text"
            label="Dirección"
            id="direccion"
            placeHolder="ej: Calle 45 #10-23"
            error={errors.direccion}
            {...register("direccion", {
              required: "La dirección es obligatoria*",
            })}
          />

          {/* Botones */}
          <div className={styles.buttons}>
            <Button variant="buttonCancel" parentMethod={onClose}>
              Cancelar <TrashIcon />
            </Button>
            <Button type="submit" variant="buttonAccept">
              Guardar <CheckIcon />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
