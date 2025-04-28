import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./registroUsuarios.css"

export default function RegistroUsuario() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    ({
      title: "¡UsSwal.fireuario registrado!",
      text: "El usuario fue registrado exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const handleDelete = () => {
    return window.location.href = "./dashboard"
  };

  const handleSelectRole = (role) => {
    setValue("rol", role);
  };

  // TODO: Remplazar los inputs por el componente reutilizable
  // TODO: Emplear la api el momento de enviar el formulario
  // TODO: Revisar estilos
  

  return (
    <div className="registro-container">
      <h2 className="titulo-formulario">Registro de Usuario</h2>
      <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
        <label># Cédula</label>
        <input type="text" placeholder="1099543569" {...register("cedula", { required: "La cédula es obligatoria"})} />
        {errors.cedula && <p className="error">{errors.cedula.message}</p>}

        <label>Nombres</label>
        <input type="text" placeholder="Ej: Andrea Paola" {...register("nombres", { required: "El nombre es obligatorio" })} />
        {errors.nombres && <p className="error">{errors.nombres.message}</p>}

        <label>Apellidos</label>
        <input type="text" placeholder="Ej: Niño Bedoya" {...register("apellidos", { required: "El apellido es obligatorio" })} />
        {errors.apellidos && <p className="error">{errors.apellidos.message}</p>}

        <label>Correo Electrónico</label>
        <input type="email" placeholder="andrea@gmail.com" {...register("correo", { required: "El correo es obligatorio" })} />
        {errors.correo && <p className="error">{errors.correo.message}</p>}

        <label>Rol:</label>
        <div className="botones-rol">
          <button type="button" className="boton-rol" onClick={() => handleSelectRole("Administrador")}>
            Administrador
          </button>
          <button type="button" className="boton-rol" onClick={() => handleSelectRole("Analista")}>
            Analista
          </button>
        </div>
        {errors.rol && <p className="error">{errors.rol.message}</p>}

        {/* Campo oculto para el rol */}
        <input type="hidden" {...register("rol", { required: "Debe seleccionar un rol" })} />

        <div className="botones-accion">
          <button type="button" className="boton-eliminar" onClick={handleDelete}>
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

