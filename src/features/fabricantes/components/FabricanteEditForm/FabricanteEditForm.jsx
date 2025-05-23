import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";

import { EditFabricante } from "../../services";
import { Input, Button } from "@shared/components";
import { CheckIcon, TrashIcon } from "@shared/iconos";

import styles from "./FabricanteEditForm.module.css";


export function FabricanteEditForm({ isOpen, onClose, fabricante }) {

  // Verificamos que el usuario halla desencadenado que el modal se abra
  if (!isOpen) {
    return null
  }

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


  // Funcion para manejar la logica de envio de datos del formulario
  const onSubmit = (data) => {
    const payload = {
      nombre: data.nombre,
      direccion: data.direccion,
    };

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
          const response = await EditFabricante(fabricante.id, payload);
          if (response) {
            Swal.fire({
              title: "Se actualizo el fabricante con exito!",
              icon: "success",
              heightAuto: false,
              scrollbarPadding: false,
            }).then(
              () => {
                window.location.href = "/fabricantes";
              }
            );
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

  // Cuando cambia el fabricante, actualiza valores en el formulario
  useEffect(() => {
    if (fabricante) {
      reset({
        id: fabricante.id,
        nombre: fabricante.nombre,
        direccion: fabricante.direccion,
      });
    }
  }, [fabricante, reset]);

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <h2>Editar Fabricante</h2>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

          {/* Campos del Formulario */}
          <div className={styles.inputsContainer}>
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
          </div>

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