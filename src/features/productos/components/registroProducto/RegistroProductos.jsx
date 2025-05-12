import { useEffect, useState } from "react";
import {obtenerClientes, obtenerFabricantes,RegistrarProducto,
} from "../../services";
import { Input, SelectButton, Button } from "@shared/components";
import { ProductosIcon, CajaIcon, BotellaIcon, TrashIcon, CheckIcon,} from "@shared/iconos";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import ProgressBar from "@shared/components/progressBar/progressBar";
import styles from "./RegistroProductos.module.css";


//Funcion para la logica del registro de productos
export default function RegistroProducto() {
  const [clientes, setClientes] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    //Tigger para que haga la validacion en cada paso
    trigger,
  } = useForm({
    defaultValues: {
      idTipo: 3,
    },
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {

        //Se obtiene los datos del cliente y fabricante para luego mostrarlos en un select
        const clientesData = await obtenerClientes();
        const fabricantesData = await obtenerFabricantes();

        console.log("Datos de clientes:", clientesData);
        console.log("Datos de fabricantes:", fabricantesData);

        // Verificamos que el cliente y fabricante sean arrays
        //Array de clientes
        if (Array.isArray(clientesData)) {
          setClientes(clientesData);
        } else {
          console.warn("La respuesta de clientes no es un array:", clientesData);
          setClientes([]);
        }
        //Array de fabricantes
        if (Array.isArray(fabricantesData)) {
          setFabricantes(fabricantesData);
        } else {
          console.warn("La respuesta de fabricantes no es un array:", fabricantesData);
          setFabricantes([]);
        }

      } catch (error) {
        console.error("Error al cargar datos:", error);
        setClientes([]);
        setFabricantes([]);
      }
    };

    cargarDatos();
  }, [])

  //Valida los campos antes de continuar al siguiente paso
  const onError = () => {
    Swal.fire({
      title: "Faltan campos obligatorios",
      text: "Por favor completa todos los campos requeridos.",
      icon: "error",
      confirmButtonText: "Entendido",
    });
  };

  //Constante para que al presionar el boton lo lleve al siguiente paso del formulario
  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep(step + 1);
    else onError();
  };

  //Constante para devolverte al paso anterior
  const prevStep = () => setStep(step - 1);

  //Se realiza el envio del formulario
  const onSubmit = async (data) => {
  Swal.fire({
    title: "¿Estás seguro de registrar el producto?",
    icon: "warning",
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor: "red",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Convertir fechas a string "YYYY-MM-DD"
        const fechaFabricacion = new Date(data.fechaFabricacion).toISOString().split("T")[0];
        const fechaVencimiento = new Date(data.fechaVencimiento).toISOString().split("T")[0];
        
        //Estructa para enviar el foemulario de manera que el backend lo lea
        const producto = {
          numeroRegistro: data.numeroRegistro,
          nombre: data.nombre,
          fechaFabricacion,
          fechaVencimiento,
          descripcion: data.descripcion,
          compuestoActivo: data.compuestoActivo,
          presentacion: data.presentacion,
          cantidad: data.cantidad,
          numeroLote: data.numeroLote,
          tamanoLote: data.tamanoLote,
          idTipo: parseInt(data.idTipo),
        };
        
        //Se envian alertas dependiendo el resultado 
        const success = await RegistrarProducto({ producto });

        //En caso de que el producto sea registrado
        if (success) {
          Swal.fire("¡Se registró el producto con éxito!", "", "success").then(() => {
            window.location.href = "/productos";
          });
        }
      } catch (err) {
        // En caso de que hay aun error
        Swal.fire({
          icon: "error",
          title: "¡Ups! Algo salió mal",
          text: err.message,
        });
      }
    }
  });
};
  //Si decide cancelar lo redirigimos a los productos
  const redirectPrevious = () => {
    window.location.href = "/productos";
  };

  return (
    <form
      className={styles.formulario}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {/* Titulo del foemulario */}
      <h2>Formulario Registro Producto</h2>

      {/* Step o paso 1 */}
      {step === 1 && (
        <div className={`${styles.inputContainer} row`}>
          <div className={`col-lg-12 ${styles.inputs}`}>
            <h3>Información General</h3>
            {/* Input numero de registro */}
            <Input
              id="numeroRegistro"
              type="text"
              label="# Registro"
              placeHolder="ej:47448"
              error={errors.numeroRegistro}
              {...register("numeroRegistro", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9\s.-]+$/,
                  message: "Asegúrate que el formato sea: AAAA-0000-0000",
                },
              })}
            />
            {/* Input nombre del producto */}
            <Input
              id="nombre"
              type="text"
              label="Nombre Producto"
              placeHolder="ej:Paracetamol"
              error={errors.nombre}
              {...register("nombre", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "El nombre no puede contener números",
                },
              })}
            />
            {/* Input descripcion del producto */}
            <Input
              id="descripcion"
              type="text"
              label="Descripción del Producto"
              placeHolder="ej:Analgésico"
              error={errors.descripcion}
              {...register("descripcion", {
                required: "Este campo es obligatorio",
              })}
            />
          </div>
        </div>
      )}

      {/* Step o paso 2 */}
      {step === 2 && (
        <div className={`${styles.inputContainer} row`}>
          <div className={`col-lg-12 ${styles.inputs}`}>
            <h3>Información Proveedores</h3>
            {/* Input id cliente */}
            <Input
              id="idCliente"
              type="select"
              label="Cliente"
              options={clientes.map((cliente) => ({
                value: cliente.id, 
                label: cliente.nombre, 
              }))}
              error={errors.idCliente}
              {...register("idCliente", {
                required: "Este campo es obligatorio",
                validate: (value) => value !== "" || "Seleccione un cliente",
              })}
            />

            {/* Input id fabricante */}
            <Input
              id="idFabricante"
              type="select"
              label="Nombre del Fabricante"
              options={fabricantes.map((fabricante) => ({
                value: fabricante.id, 
                label: fabricante.nombre, 
              }))}
              error={errors.idFabricante}
              {...register("idFabricante", {
                required: "Este campo es obligatorio",
                validate: (value) => value !== "" || "Seleccione un fabricante",
              })}
            />

            <h3>Fechas</h3>
            {/* Input fecha defabricacion */}
            <Input
              id="fechaFabricacion"
              type="date"
              label="Fecha de Fabricación"
              error={errors.fechaFabricacion}
              {...register("fechaFabricacion", {
                required: "Este campo es obligatorio",
              })}
            />
            {/* Input fecha de vencimiento */}
            <Input
              id="fechaVencimiento"
              type="date"
              label="Fecha Vencimiento"
              error={errors.fechaVencimiento}
              {...register("fechaVencimiento", {
                required: "Este campo es obligatorio",
              })}
            />
          </div>
        </div>
      )}

      {/* Step o paso 3 */}
      {step === 3 && (
        <div className={`${styles.inputContainer} row`}>
          <div className={`col-lg-12 ${styles.inputs}`}>
            <h3>Información Adicional</h3>
            {/* Input numero de lote */}
            <Input
              id="numeroLote"
              type="text"
              label="# Lote"
              placeHolder="8474648"
              error={errors.numeroLote}
              {...register("numeroLote", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "No puede contener caracteres especiales",
                },
              })}
            />
            {/* Input tamño del lote */}
            <Input
              id="tamanoLote"
              type="text"
              label="Tamaño Lote"
              placeHolder="193939"
              error={errors.tamanoLote}
              {...register("tamanoLote", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "No puede contener caracteres especiales",
                },
              })}
            />
            {/* Input cantidad del producto */}
            <Input
              id="cantidad"
              type="text"
              label="Cantidad"
              placeHolder="300g"
              error={errors.cantidad}
              {...register("cantidad", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "No puede contener caracteres especiales",
                },
              })}
            />
            {/* Input presentacion del prodcuto */}
            <Input
              id="presentacion"
              type="text"
              label="Presentación"
              placeHolder="Medicamento en crema"
              error={errors.presentacion}
              {...register("presentacion", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "No puede contener números",
                },
              })}
            />
            {/* Input compuesto */}
            <Input
              id="compuestoActivo"
              type="text"
              label="Compuesto"
              placeHolder="Nombre del compuesto"
              error={errors.compuestoActivo}
              {...register("compuestoActivo", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "No puede contener números",
                },
              })}
            />
          </div>
        </div>
      )}
      {/* Step o paso 4  */}
      {step === 4 && (
        <div className={`${styles.inputContainer} row`}>
          <h3>Tipo Producto</h3>
          <Controller
            control={control}
            name="idTipo"
            rules={{ required: "Este campo es obligatorio" }}
            render={({ field: { value, onChange } }) => (
              <div className="row">
                <div className="col-md-4">
                  {/* Boton materia prima con el id 1 */}
                  <SelectButton
                    variant="orange"
                    selected={value === 1}
                    parentMethod={() => onChange(1)}
                  >
                    Materia Prima
                    <ProductosIcon />
                  </SelectButton>
                </div>
                <div className="col-md-4">
                  {/* Boton material de empaque con id 2 */}
                  <SelectButton
                    variant="gray"
                    selected={value === 2}
                    parentMethod={() => onChange(2)}
                  >
                    Material de Empaque
                    <CajaIcon />
                  </SelectButton>
                </div>
                <div className="col-md-4">
                  {/* Boton producto terminado con id 3 */}
                  <SelectButton
                    variant="lightBlue"
                    selected={value === 3}
                    parentMethod={() => onChange(3)}
                  >
                    Producto terminado
                    <BotellaIcon />
                  </SelectButton>
                </div>
              </div>
            )}
          />
        </div>
      )}

      {/* Barra de progreso que muestra es que paso va el usuario */}
      {/* cambiar el total de pasos si se agregan mas pasos */}
      <ProgressBar pasoActual={step} totalPasos={4} />

      {/* Para manejar los botones  */}
      <div className={styles.actionButtons}>
        {step === 1 && (
          <Button variant="buttonCancel" parentMethod={redirectPrevious}>
            Cancelar <TrashIcon />
          </Button>
        )}

        {step > 1 && (
          <Button variant="buttonCancel" parentMethod={prevStep}>
            Atrás
          </Button>
        )}

        {/* si se quiere que el boton de aceptar solo salga en el ultimo paso se cambia el 4 por el numero de pasos */}
        {step < 4 && (
          <Button variant="buttonAccept" parentMethod={nextStep}>
            Siguiente
          </Button>
        )}

        {/* Aca tambien se cambia el 4 por el numerode pasos */}
        {step === 4 && (
          <Button type="submit" variant="buttonAccept">
            Aceptar <CheckIcon />
          </Button>
        )}
      </div>
    </form>
  );
}
