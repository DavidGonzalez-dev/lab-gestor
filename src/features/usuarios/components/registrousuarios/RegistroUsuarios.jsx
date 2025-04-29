import { useForm, Controller } from "react-hook-form";
import { Input, SelectButton } from "@shared/components";

import Swal from "sweetalert2";
import { AnalistaIcon, AdminIcon } from "@shared/iconos";

import { RegistrarUsuario } from "../../services";
import "./registroUsuarios.css";

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
      cancelButtonColor: "red"

    }).then(async (result) => {

      // Si se confirma que se quiere enviar el formulario
      if (result.isConfirmed) {

        // Se hace llamada a la api
        const success = await RegistrarUsuario(data);
        
        // Se verifica que la llama fue exitosa
        if (!success) {
          // Caso: la respuesta fue exitosa
          Swal.fire("Ups! Algo salio mal", "", "error");
        } 
        // Caso: la respuesta tuvo un error
        else {
          Swal.fire("Se registro el usuario con extio!", "", "success");
        }
      }
    });
  };

  return (
    <div className="registro-container">
      {/* Titulo del Formulario */}
      <h2 className="titulo-formulario">Registro de Usuario</h2>
      <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
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

        <label>Rol:</label>

        {/* Controlador encargado de conectar los botones selectores en el form */}
        <Controller
          control={control}
          name="rol"
          render={({ field: { value, onChange } }) => (
            <div className="botonesRol">
              {/* Boton del administrador */}
              <SelectButton
                variant={"darkBlue"}
                selected={value === 1}
                parentMethod={() => onChange(1)}
              >
                Administrador
                <AdminIcon />
              </SelectButton>

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
          )}
        />

        <div className="botones-accion">
          <button type="button" className="boton-eliminar">
            Eliminar
          </button>
          <button type="submit" className="boton-aceptar">
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
}
