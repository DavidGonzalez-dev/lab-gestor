import { useForm, Controller } from "react-hook-form"
import { EditUser } from "../../services"
import { useState } from "react"

import Swal from "sweetalert2"
import { Input, SelectButton, Button, LoaderSpiner } from "@shared/components"
import { AdminIcon, AnalistaIcon, CheckIcon, TrashIcon } from "@shared/iconos"

import styles from "./EditUserForm.module.css"

// Modal de edición de usuario
export function EditUserModal({ isOpen, onClose, usuario }) {
  

  // Configuración del formulario con react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: usuario.documento,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      rolId: usuario.rol.id,
      estado: usuario.estado,
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {

    const payload = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      correo: data.correo,
      estado: data.estado,
      rolId: data.rolId,
    }

    Swal.fire({
      title: "¿Estas seguro de actualizar este usuario?",
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
          const response = await EditUser(data.id, payload)
          if (response) {
            Swal.fire({
              title: "Se actualizó el usuario con exito!",
              icon: "success",
              heightAuto: false,
              scrollbarPadding: false,
            }).then(
              () => {
                window.location.href = "/usuarios"
              }
            )
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Ups! algo salió mal",
            text: err.message,
            heightAuto: false,
            scrollbarPadding: false,
          })
        }
      }
    })
  }


  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Usuario</h2>

        {/* Formulario de edición */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

          <div className={styles.inputsContainer}>

            {/* Columna de la izquierda campos de texto */}
            <div className={styles.leftColumn}>

              {/* Campo Documento */}
              <Input
                type="text"
                label="#Documento"
                id="documento"
                disabled={true}
                placeHolder="ej: 1234567"
                error={errors.documento}
                {...register("id", {
                  required: "El documento es obligatorio*",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "El documento solo puede contener números*",
                  },
                })}
              />

              {/* Campo Nombres */}
              <Input
                type="text"
                label="Nombres"
                id="nombres"
                placeHolder="ej: Andrea Paola"
                error={errors.nombres}
                {...register("nombres", {
                  required: "Debe tener al menos un nombre*",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Solo puede contener letras y espacios*",
                  },
                })}
              />

              {/* Campo Apellidos */}
              <Input
                type="text"
                label="Apellidos"
                id="apellidos"
                placeHolder="ej: Torres Pérez"
                error={errors.apellidos}
                {...register("apellidos", {
                  required: "Debe tener al menos un apellido*",
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Solo puede contener letras y espacios*",
                  },
                })}
              />

              {/* Campo Correo */}
              <Input
                type="email"
                label="Correo"
                id="correo"
                placeHolder="ej: ejemplo@gmail.com"
                error={errors.correo}
                {...register("correo", {
                  required: "El correo es obligatorio*",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Debe ser una dirección de correo válida*",
                  },
                })}
              />

            </div>

            {/* Columna de la derecha selectores */}
            <div className={styles.rightColumn}>

              {/* Selector de Rol */}
              <Controller
                control={control}
                name="rolId"
                render={({ field: { value, onChange } }) => (
                  <div className={styles.buttonSelector}>
                    <label>Rol:</label>
                    <div className={` ${styles.buttonsContainer}`}>
                      <SelectButton
                        variant="darkBlue"
                        selected={value === 1}
                        parentMethod={() => onChange(1)}
                      >
                        Administrador
                        <AdminIcon />
                      </SelectButton>
                      <SelectButton
                        variant="lightBlue"
                        selected={value === 2}
                        parentMethod={() => onChange(2)}
                      >
                        Analista
                        <AnalistaIcon />
                      </SelectButton>
                    </div>
                  </div>
                )}
              />

              {/* Selector de Estado (Activo / Inactivo) */}
              <Controller
                control={control}
                name="estado"
                render={({ field: { value, onChange } }) => (
                  <div className={styles.buttonSelector}>
                    <label>Estado:</label>
                    <div className={`${styles.buttonsContainer}`}>
                      <SelectButton
                        variant="green"
                        selected={value === true}
                        parentMethod={() => onChange(true)}
                      >
                        Activo
                      </SelectButton>

                      <SelectButton
                        variant="red"
                        selected={value === false}
                        parentMethod={() => onChange(false)}
                      >
                        Inactivo
                      </SelectButton>
                    </div>
                  </div>
                )}
              />

            </div>

          </div>

          {/* Botones de acción */}
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
  )
}
