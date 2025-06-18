import Swal from "sweetalert2";
import { Input, Button, LoaderSpiner } from "@shared/components";
import { CheckIcon, TrashIcon } from "@shared/iconos";

import { EditClient } from "../../services";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";


import styles from "./ClientEditForm.module.css";

export function EditClientModal({ isOpen, onClose, cliente }) {

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: cliente.ID,
      nombre: cliente.nombre,
      direccion: cliente.direccion,
    },
  });


  // Funcion para manejar la logica de envio de datos del formulario
  const onSubmit = (data) => {

    const payload = {
      nombre: data.nombre,
      direccion: data.direccion,
    }

    Swal.fire({
      title: "¿Estas seguro de actualizar este cliente?",
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
          setIsLoading(true)
          const response = await EditClient(cliente.id, payload);
          if (response) {
            Swal.fire({
              title: "Se actualizo el cliente con exito!",
              icon: "success",
              heightAuto: false,
              scrollbarPadding: false,
            }).then(
              () => {
                window.location.href = "/clientes";
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
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  // Cuando cambia el cliente, actualiza valores en el formulario
  useEffect(() => {
    if (cliente) {
      reset({
        id: cliente.id,
        nombre: cliente.nombre,
        direccion: cliente.direccion,
      });
    }
  }, [cliente, reset]);

  // Verificamos que el usuario halla desencadenado que el modal se abra
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <h2>Editar Cliente</h2>

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
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "El nombre solo puede contener letras y espacios*"
                }
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
                pattern: {
                  value: /(cra|cr|calle|cl|av|avenida|transversal|tv|diag|dg|manzana|mz|circular|circ)[a-z]*\.?\s*\d+[a-zA-Z]?\s*(#|n°|no\.?)\s*\d+[a-zA-Z]?(?:[-]\d+)?$/,
                  message: "Ingrese una direccion valida*"
                }
              })}
            />
          </div>

          {/* Botones */}
          <div className={styles.buttons}>

            <Button variant="buttonCancel" parentMethod={onClose}>
              Cancelar <TrashIcon />
            </Button>

            <Button type="submit" variant="buttonAccept" disabled={isLoading}>
              {isLoading ? <LoaderSpiner /> : <>Guardar <CheckIcon /></>}
            </Button>

          </div>
        </form>
      </div>

    </div>
  );
}
