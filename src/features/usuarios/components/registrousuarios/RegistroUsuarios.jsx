import { Input, SelectButton, Button } from "@shared/components";
import { AnalistaIcon, AdminIcon, TrashIcon, CheckIcon } from "@shared/iconos";

import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { RegistrarUsuario } from "../../services";

import styles from "./registroUsuarios.module.css";


export default function RegistroUsuario() {

  // Se importan las utilidades dsde la libreria de react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rol: 2, // Codigo del rol del analsita en la base de datos
    },
  });

  // Funcion para manejar la logica de envio de datos al servidor
  const onSubmit = (data) => {

    // Se dispara una alerta para confrimar el envio del formulario
    Swal.fire({
      title: "¿Estas seguro de crear este usuario?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      heightAuto: false,
      scrollbarPadding: false,

    }).then(async (result) => {

      // Si se confirma que se quiere enviar el formulario
      if (result.isConfirmed) {

        // Se hace llamada a la api
        try {
          const success = await RegistrarUsuario(data);
          if (success) {
            Swal.fire({
              title: "Se registró el usuario con exito!",
              icon: "success",
              heightAuto: false,
              scrollbarPadding: false,
            }).then(() => { window.location.href = "/usuarios" });
          }
        }
        catch (err) {
          Swal.fire({
            icon: "error",
            title: "Ups! algo salio mal",
            text: err.message,
            heightAuto: false,
            scrollbarPadding: false,
          })
        }
      }
    });
  };

  // Metodo para volver atras
  const redirectPrevious = () => {
    window.location.href = "/usuarios"
  }

  return (
    <>
      {/* Titulo del Formulario */}
      <form className={styles.formulario} onSubmit={handleSubmit(onSubmit)}>

        {/* Campos del formulario */}
        <div className={`${styles.inputContainer} row`}>
          {/* Columna Izquierda */}
          <div className={`col-lg-6 ${styles.inputs}`}>
            {/* Input para el documento */}
            <Input
              type={"text"}
              label={"#Documento"}
              id={"documento"}
              placeHolder={"ej: 1234567"}
              error={errors.documento}
              {...register("documento", {
                required: "El documento es obligatorio*",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El documento solo puede contener numeros*",
                },
              })}
            />

            {/* Input para los nombres */}
            <Input
              type={"text"}
              label={"Nombres"}
              id={"nombres"}
              placeHolder={"ej: Andrea Paola"}
              error={errors.nombres}
              {...register("nombres", {
                required: "El usuario debe tener al menos 1 nombre*",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message:
                    "El nombre del usuario solo puede contener espacios y letras*",
                },
              })}
            />

            {/* Input para los apellidos */}
            <Input
              type={"text"}
              label={"Apellidos"}
              id={"apellidos"}
              placeHolder={"ej: Andrea Paola"}
              error={errors.apellidos}
              {...register("apellidos", {
                required: "El usuario debe tener al menos 1 apellido*",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message:
                    "El apellido del usuario solo puede contener espacios y letras*",
                },
              })}
            />
          </div>


          {/* Columna Derecha */}
          <div className={`col-lg-6 ${styles.inputs}`}>
            {/* Input para el correo */}
            <Input
              type={"email"}
              label={"Correo"}
              id={"correo"}
              placeHolder={"ej: andrea@gmail.com"}
              error={errors.correo}
              {...register("correo", {
                required: "El correo del usuario es obligatorio*",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingrese una direccion de correo valida*",
                },
              })}
            />


            {/* Controlador encargado de conectar los botones selectores en el form */}
            <Controller
              control={control}
              name="rol"
              render={({ field: { value, onChange } }) => (
                <div className={styles.rolSelector}>
                  <label>Rol:</label>

                  <div className={`row ${styles.botonesRol}`}>
                    {/* Boton del administrador */}
                    <div className="col-lg-6  mb-sm-2">
                      <SelectButton
                        variant={"darkBlue"}
                        selected={value === 1}
                        parentMethod={() => onChange(1)}
                      >
                        Administrador
                        <AdminIcon />
                      </SelectButton>
                    </div>

                    <div className="col-lg-6">
                      {/* Boton del analista */}
                      <SelectButton
                        variant={"lightBlue"}
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
          </div>
        </div>

        {/* Botones de Accion */}
        <div className={styles.actionButtons}>
          <Button variant="buttonCancel" parentMethod={redirectPrevious}>Cancelar <TrashIcon /></Button>
          <Button type={"submit"} variant={"buttonAccept"}>Aceptar <CheckIcon /></Button>
        </div>

      </form>
    </>
  );
}
