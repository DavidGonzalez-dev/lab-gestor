import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuthStore from "../../../../shared/stores/useAuthStore";
import { RegistrarProducto } from "../../services";

import { Input, Button, CustomTextArea, SelectButton, CustomSelect } from "@shared/components"
import { CajaIcon, ProductosIcon, BotellaIcon, TrashIcon, ArrowBackIcon, CheckIcon, ArrowForwardIcon } from "@shared/iconos"

import { getClientes } from "@features/clientes/services";
import { getFabricantes } from "@features/fabricantes/services"

import styles from "./RegistroProductos.module.css";
import Swal from "sweetalert2";



//Funcion para la logica del registro de productos
export default function RegistroProducto() {

  // Instanciamos la utilidades que vamos a usar
  const { register, handleSubmit, formState: { errors }, watch, control, trigger } = useForm({ defaultValues: { idTipo: 1 }, mode: "onChange" })
  const fechaFabricacion = watch("fechaFabricacion") // Observamos la fecha de fabricacion con el fin de poder hacer verificaciones
  const fechaRecepcion = watch("fechaRecepcion") // Observamos la fecha de recepcion con el fin de poder hacer verificaciones


  const [clientes, setClientes] = useState([]) // Estado para almacenar los clientes
  const [fabricantes, setFabricantes] = useState([]) // Estado para almacenar los fabricantes
  const [step, setStep] = useState(1) // Estado para la paginacion de los pasos del formulario

  const { userId } = useAuthStore()


  //? --------------------------------------------------
  //? Logica de control de paginacion de formulario
  //? --------------------------------------------------

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) {
      setStep((prev) => prev + 1);
    }
  };


  const prevStep = () => {
    setStep((step) => step - 1)
  }


  //? --------------------------------------------------
  //? Logica de envio de datos al servidor
  //? --------------------------------------------------
  const onSubmit = (data) => {

    const payload = {
      producto: {
        numeroRegistro: data.numeroRegistro,
        nombre: data.nombre,
        fechaFabricacion: data.fechaFabricacion,
        fechaVencimiento: data.fechaVencimiento,
        descripcion: data.descripcion,
        compuestoActivo: data.compuestoActivo,
        presentacion: data.presentacion,
        cantidad: data.cantidad,
        numeroLote: data.numeroLote,
        tamanoLote: data.tamanoLote,
        idCliente: Number(data.idCliente),
        idFabricante: Number(data.idFabricante),
        idTipo: Number(data.idTipo),
      },
      detallesEntrada: {
        propositoAnalisis: data.propositoAnalisis,
        condicionesAmbientales: data.condicionesAmbientales,
        fechaRecepcion: data.fechaRecepcion,
        fechaInicioAnalisis: data.fechaInicioAnalisis,
        fechaFinalAnalisis: data.fechaFinalAnalisis || null, // Por si no lo has implementado aún
        idUsuario: userId, // Si tienes auth, puedes sacarlo del contexto
      }
    }

    // Se le pide al usuario confirmacion para crear el producto
    Swal.fire({
      title: "Seguro que quieres crear este producto?",
      text: "Revisa que la informacion que hallas escrito sea correcta. Igualmente podras editar esta informacion mas adelante en la pagina de los detalles del roducto",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      heightAuto: false,
      scrollbarPadding: false,
    })
      .then(async (result) => {

        // Si el usuario acepto se hace la peticion al servidor
        if (result.isConfirmed) {

          // Se intenta hacer la peticion al servidor
          try {
            const success = await RegistrarProducto(payload)
            if (success) {
              Swal.fire({
                title: "Se creo el producto con exito",
                text: "Ahora podras realizar los distintos analisis requeridos y registrarlos en el sistema desde la pagina de los detalles del producto!",
                icon: "success",
                heightAuto: false,
                scrollbarPadding: false,
              })
                .then(() => window.location.href = "/productos")
            }
          }

          // En caso de haber un error se genera una alerta con dicho error
          catch (err) {

            Swal.fire({
              title: "Ups! Hubo un error",
              text: err.message,
              icon: "error",
              heightAuto: false,
              scrollbarPadding: false,
            })

          }
        }
      })
  }


  //? --------------------------------------------------
  //? Carga de datos
  //? --------------------------------------------------

  // Funcion para traer a todos los clientes
  const loadClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  }

  // Funcion para traer a todos los fabricantes
  const loadFabricantes = async () => {
    try {
      const data = await getFabricantes();
      setFabricantes(data);
    } catch (error) {
      console.error("Error al cargar fabricantes:", error);
    }
  }


  useEffect(() => {
    loadClientes()
    loadFabricantes()
  }, [])

  return (
    // Maquetar los distintos pasos del formulario
    <form className={styles.formContainer}>
      <hr />
      {step === 1 && (
        <>
          <h2>Infomacion General del Producto</h2>
          <div className={styles.inputContainer} id={styles.firstStep}>
            {/* Input Numero de registro de producto */}
            <Input
              id="numeroRegistro"
              type="text"
              label="Numero de Registro"
              placeholder="Ej: AAAA-0000-0000"
              error={errors.numeroRegistro}
              {...register("numeroRegistro", {
                required: "El numero de registro es obligatorio*",
                pattern: {
                  value: /^[A-Z]{4}-\d{4}-\d{4}$/,
                  message: "El numero de registro tiene un formato incorrecto. Ej: AAAA-0000-0000*"
                }
              })}
            />

            {/* Input para el nombre del producto */}
            <Input
              id="nombre"
              type="text"
              label="Nombre del Producto"
              placeholder="Ej: Acetaminofem"
              error={errors.nombre}
              {...register("nombre", {
                required: "El nombre del producto es obligatorio*",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "El nombre del producto solo puede contener letras y espacios*"
                }
              })}
            />



            {/* TextArea para descripcion del producto */}
            <CustomTextArea
              id="descripcion"
              label="Descripcion"
              placeholder="Descripcion..."
              error={errors.descripcion}
              {...register("descripcion", {
                required: "La descripcion es obligatoria*"
              })}
            />

            {/* Input para la presentacion */}
            <Input
              id="presentacion"
              label="Presentacion"
              type="text"
              placeholder="Ej: Blister"
              error={errors.presentacion}
              {...register("presentacion", {
                required: "La presentacion es obligatoria*",
              })}
            />
            <h2>Informacion de la Muestra</h2>
            {/* Contenedor para la cantidad y el principio Activo*/}
            <div className={styles.twoColumnContainer}>

              {/* Input para el principio activo del producto */}
              <Input
                id="compuestoActivo"
                label="Compuesto Activo"
                type="text"
                placeholder="Ej: Paracetamol"
                error={errors.compuestoActivo}
                {...register("compuestoActivo", {
                  required: "El compuesto activo es obligatorio*",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "La presentacion no puede contener numeros*"
                  }
                })}
              />

              {/* Input para la cantidad de producto */}
              <Input
                id="cantidad"
                label="Cantidad de la Muestra"
                type="text"
                placeholder="Ej: 10mg"
                error={errors.cantidad}
                {...register("cantidad", {
                  required: "La cantidad es obligatoria*",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "La cantidad no puede contener parametros especiales"
                  }
                })}
              />
            </div>

            {/* Contenedor para las fechas */}
            <div className={styles.twoColumnContainer}>

              {/* Input para la fecha de fabricacion */}
              <Input
                id="fechaFabricacion"
                type="date"
                label="Fecha de Fabricacion"
                placeholder="YYYY-MM-DD"
                error={errors.fechaFabricacion}
                {...register("fechaFabricacion", {
                  required: "La fecha de fabricacion es obligatoria*",
                })}
              />

              {/* Inputa para la fecha de Vencimiento */}
              <Input
                id="fechaVencimiento"
                type="date"
                label="Fecha de Vencimiento"
                placeholder="YYYY-MM-DD"
                error={errors.fechaVencimiento}
                {...register("fechaVencimiento", {
                  required: "La fecha de vecimiento es obligatoria*",
                  validate: (value) => !fechaFabricacion || new Date(value) >= new Date(fechaFabricacion) || "La fecha de vencimiento debe ser mayor a lafecha de fabricacion*"
                })}
              />

            </div>

            {/* Selector de tipo de producto */}
            <Controller
              name="idTipo"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className={styles.typeSelector}>
                  <label>Tipo de la Muestra:</label>

                  <div className={styles.selectButtonContainer}>
                    {/* Boton de material empaque */}
                    <SelectButton
                      variant="gray"
                      selected={value === 1}
                      parentMethod={() => onChange(1)}
                    >
                      Material Empaque
                      <CajaIcon />
                    </SelectButton>

                    {/* Boton de materia prima */}
                    <SelectButton
                      variant="orange"
                      selected={value === 2}
                      parentMethod={() => onChange(2)}
                    >
                      Materia Prima
                      <ProductosIcon />
                    </SelectButton>

                    {/* Boton de producto terminado */}
                    <SelectButton
                      variant="darkBlue"
                      selected={value === 3}
                      parentMethod={() => onChange(3)}
                    >
                      Producto Terminado
                      <BotellaIcon />
                    </SelectButton>
                  </div>
                </div>
              )}
            />
          </div>
        </>
      )}


      {step === 2 && (
        <>
          <h2>Informacion del Lote</h2>
          <div className={styles.inputContainer} id={styles.secondStep}>

            {/* Inputs acerca de los lotes */}
            <div className={styles.twoColumnContainer}>
              {/* Input para el numero de lote */}
              <Input
                id="numeroLote"
                label="Numero de Lote"
                placeholder="Ej: LOTE001"
                error={errors.numeroLote}
                {...register("numeroLote", {
                  required: "El numero de lote es obligatorio*",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "El numero de lote no puede contener caracteres especiales*"
                  }
                })}
              />

              {/* Input para el tamaño del lote */}
              <Input
                id="tamanoLote"
                label="Tamaño de Lote"
                placeholder="Ej: 100 unidades"
                error={errors.tamanoLote}
                {...register("tamanoLote", {
                  required: "El tamaño del lote es obligatorio*",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "El tamaño del lote no puede contener caracteres especiales*"
                  }
                })}
              />
            </div>

            <h2>Informacion de Proveedores</h2>
            {/* Inputs para informacion de proveedores y clientes */}
            <div className={styles.twoColumnContainer}>

              {/* Inputs con la informacion de los clientes */}
              <CustomSelect
                id="idCliente"
                label="Cliente"
                error={errors.idCliente}
                options={clientes.map(cliente => ({ value: cliente.id, label: cliente.nombre }))}
                {...register("idCliente", {
                  required: "Tiene que escoger un cliente*"
                })}
              />

              {/* Inputs con la informacion de los clientes */}
              <CustomSelect
                id="idFabricante"
                label="Fabricante"
                error={errors.idFabricante}
                options={fabricantes.map(fabricante => ({ value: fabricante.id, label: fabricante.nombre }))}
                {...register("idFabricante", {
                  required: "Tiene que escoger un fabricante*"
                })}
              />
            </div>

          </div>
        </>
      )}


      {step === 3 && (
        <>
          <h2>Informacion Adicional de la Entrada al Area</h2>
          <div className={styles.inputContainer} id={styles.thirdStep}>
            {/* TextArea para descripcion del producto */}
            <CustomTextArea
              id="propositoAnalisis"
              label="Proposito del Analisis"
              placeholder="Proposito del Analisis..."
              error={errors.propositoAnalisis}
              {...register("propositoAnalisis", {
                required: "El proposito del analisis es obligatorio*"
              })}
            />

            <Input
              id="condicionesAmbientales"
              label="Condiciones Ambientales"
              placeholder="Ej: Ambiente"
              type="text"
              error={errors.condicionesAmbientales}
              {...register("condicionesAmbientales", {
                required: "Las condiciones ambientales son obligatorias*"
              })}
            />

            <div className={styles.twoColumnContainer}>

              {/* Input para la fecha de recepcion */}
              <Input
                id="fechaRecepcion"
                type="date"
                label="Fecha de Recepcion"
                placeholder="YYYY-MM-DD"
                error={errors.fechaRecepcion}
                {...register("fechaRecepcion", {
                  required: "La fecha de Recepcion es obligatoria*",
                })}
              />

              {/* Inputa para la fecha de Inicio de Analisis */}
              <Input
                id="fechaInicioAnalisis"
                type="date"
                label="Fecha de Inicio de Analisis"
                placeholder="YYYY-MM-DD"
                error={errors.fechaInicioAnalisis}
                {...register("fechaInicioAnalisis", {
                  required: "La fecha de inicio de analisis es obligatoria*",
                  validate: (value) => !fechaRecepcion || new Date(value) >= new Date(fechaRecepcion) || "La fecha de inicio de analisis no puede ser menor a la fecha de recepcion*"
                })}
              />
            </div>
          </div>
        </>
      )}

      <hr />

      {/* Controladores del formulario */}
      <div className={styles.formControllers}>

        <Button variant="buttonCancel" parentMethod={step === 1 ? () => window.location.href = "/productos" : prevStep}>
          {step === 1
            ? <>Cancelar <TrashIcon /></>
            : <>Atras <ArrowBackIcon /></>
          }
        </Button>

        <Button variant="buttonAccept" parentMethod={step === 3 ? handleSubmit(onSubmit) : nextStep}>
          {step === 3
            ? <>Registrar <CheckIcon /></>
            : <>Siguiente <ArrowForwardIcon/></>
          }
        </Button>

      </div>
    </form>
  )
}
