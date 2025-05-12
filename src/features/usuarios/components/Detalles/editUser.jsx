import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { EditUser } from "../../services";
import { Input, SelectButton, Button } from "@shared/components";
import { AdminIcon, AnalistaIcon, CheckIcon, TrashIcon } from "@shared/iconos";

import styles from "./editUser.module.css";

export function EditUserModal({ isOpen, onClose, usuario, onSave }) {
  if (!isOpen) return null;
  console.log(usuario);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: usuario.ID,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      rolId: usuario.rol.CodigoRol,
    },
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "¿Estas seguro de actualizar este usuario?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await EditUser(data);
          if (response) {
            Swal.fire("Se actualizó el usuario con éxito!", "", "success").then(
              () => {
                window.location.href = "/usuarios";
              }
            );
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Ups! algo salió mal",
            text: err.message,
          });
        }
      }
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Documento */}
          <Input
            type="text"
            label="#Documento"
            id="documento"
            disbaled={true}
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

          {/* Nombres */}
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

          {/* Apellidos */}
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

          {/* Correo */}
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

          {/* Selector de Rol */}
          <Controller
            control={control}
            name="rolId"
            render={({ field: { value, onChange } }) => (
              <div className={styles.rolSelector}>
                <label>Rol:</label>
                <div className={`row ${styles.botonesRol}`}>
                  <div className="col-6">
                    <SelectButton
                      variant="darkBlue"
                      selected={value === 1}
                      parentMethod={() => onChange(1)}
                    >
                      Administrador
                      <AdminIcon />
                    </SelectButton>
                  </div>
                  <div className="col-6">
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
              </div>
            )}
          />
          <Controller
            control={control}
            name=""
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
