import styles from "./EditProductForm.module.css"

import { Input, CustomSelect, CustomTextArea, Button, SelectButton } from "@shared/components"
import { SuccessAlert, ErrorAlert, ConfirmAlert } from "@shared/components/Alerts"
import { CajaIcon, BotellaIcon, ProductosIcon, CheckIcon, TrashIcon } from "@shared/iconos"

import { getClientes } from "@features/clientes/services"
import { getFabricantes } from "@features/fabricantes/services"
import { UpdateProduct } from "../../services"

import { useForm, Controller } from "react-hook-form"
import { useState, useEffect } from "react"

export const EditProductForm = ({ initialValues, closeAction }) => {

    // Valores iniciales del formulario
    const formattedInitialValues = {
        ...initialValues,
        fechaFabricacion: initialValues.fechaFabricacion ? new Date(initialValues.fechaFabricacion).toISOString().split('T')[0] : '',
        fechaVencimiento: initialValues.fechaVencimiento ? new Date(initialValues.fechaVencimiento).toISOString().split('T')[0] : '',
        idCliente: initialValues.cliente.id,
        idFabricante: initialValues.fabricante.id,
        idTipo: initialValues.tipo.id

    }

    // Importamos las utilidades de react-hook-form
    const { register, handleSubmit, formState: { errors }, watch, control } = useForm({
        defaultValues: formattedInitialValues
    })

    // Observamos la fecha de fabricacion con el fin de hacer validaciones
    const fechaFabricacion = watch("fechaFabricacion")

    const [clientes, setClientes] = useState([])
    const [fabricantes, setFabricantes] = useState([])


    // Funcion para gestionar el envio de datos
    const onSubmit = (payload) => {
        ConfirmAlert.fire({
            title: "¿Seguro quieres editar la informacion del producto?",
            text: "Ten en cuenta que estos cambios pueden afectar a los registros relacionados con este producto"
        })
        .then(async (result) => {
            if(result.isConfirmed){
                try{
                    const success = await UpdateProduct(initialValues.numeroRegistro, payload)
                    if(success){
                        SuccessAlert.fire({
                            title: "Se actualizo el producto con exito"
                        }).then(() => location.reload())
                    }
                } catch(error) {
                    ErrorAlert.fire({
                        title: "Ups! hubo un error",
                        text: error.message
                    })
                }
            }
        })

    }

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
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>

                {/* Input para el nombre */}
                <Input
                    id="nombre"
                    type="text"
                    label="Nombre Producto"
                    placeHolder="Ej: Paracetamol"
                    error={errors.nombre}
                    {...register("nombre", {
                        required: "El nombre no puede estar vacio*",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                            message: "El nombre solo puede tener letras y espacios*"
                        }
                    })}
                />

                <div className={styles.twoColumns}>
                    {/* Fecha de fabricacion */}
                    <Input
                        id="fechaFabricacion"
                        type="date"
                        label="Fecha de Fabricacion"
                        error={errors.fechaFabricacion}
                        {...register("fechaFabricacion", {
                            required: "La fecha de fabricacion no puede estar vacia*"
                        })}
                    />

                    {/* Fecha de vencimiento */}
                    <Input
                        id="fechaVencimiento"
                        type="date"
                        label="Fecha de Vencimiento"
                        error={errors.fechaVencimiento}
                        {...register("fechaVencimiento", {
                            required: "La fecha de vencimiento no puede estar vacia*",
                            validate: (value) => !fechaFabricacion || new Date(value) >= new Date(fechaFabricacion) || "La fecha de vencimiento no puede ser menor a la fecha de fabricacion*"
                        })}
                    />

                </div>

                {/* Descripcion */}
                <CustomTextArea
                    id="descripcion"
                    label="Descripcion de la Muestra"
                    placeHolder="Ej: Blister de color plateado..."
                    error={errors.descripcion}
                    {...register("descripcion", {
                        required: "La descripcion no puede estar vacia*",
                    })}
                />

                <div className={styles.twoColumns}>
                    {/* Compuesto Acrtivo */}
                    <Input
                        id="compuestoActivo"
                        type="text"
                        label="Compuesto Activo"
                        placeHolder="Ej: Paracetamol"
                        error={errors.compuestoActivo}
                        {...register("compuestoActivo", {
                            required: "El compuesto activo no puede estar vacio*",
                            pattern: {
                                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                                message: "El compuesto activo solo puede tener letras y espacios*"
                            }
                        })}
                    />

                    {/* Presentacion */}
                    <Input
                        id="presentacion"
                        type="text"
                        label="Presentacion"
                        placeHolder="Ej: Blister"
                        error={errors.presentacion}
                        {...register("presentacion", {
                            required: "La presentacion no puede estar vacia*",
                            pattern: {
                                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                                message: "La presentacion solo puede contener letras y espacios*"
                            }
                        })}
                    />
                </div>

                {/* Cantidad */}
                <Input
                    id="cantidad"
                    type="text"
                    label="Cantidad de la Muestra"
                    placeHolder="Ej: 10mg"
                    error={errors.cantidad}
                    {...register("cantidad", {
                        required: "La cantidad no puede estar vacia*",
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "La cantidad no puede contener caracteres especiales*"
                        }
                    })}
                />

                <div className={styles.twoColumns}>
                    {/* Numero Lote */}
                    <Input
                        id="numeroLote"
                        type="text"
                        label="Numero de Lote"
                        placeHolder="Ej: lote-001"
                        error={errors.numeroLote}
                        {...register("numeroLote", {
                            required: "El lote no puede estar vacio*",
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "El lote no puede contener caracteres especiales*"
                            }
                        })}
                    />

                    {/* Tamano Lote */}
                    <Input
                        id="tamanoLote"
                        type="text"
                        label="Tamaño del Lote"
                        placeHolder="Ej: 100 unidades"
                        error={errors.tamanoLote}
                        {...register("tamanoLote", {
                            required: "El tamaño del lote no puede estar vacio*",
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "El tamaño del lote no puede contener caracteres especiales*"
                            }
                        })}
                    />
                </div>

                <div className={styles.twoColumns}>

                    {/* Clientes */}
                    <CustomSelect
                        id="idCliente"
                        label="Cliente"
                        options={clientes.map(cliente => ({
                            label: cliente.nombre,
                            value: cliente.id
                        }))}
                        error={errors.idCliente}
                        {...register("idCliente", {
                            required: "Seleccione un cliente*"
                        })}
                    />

                    {/* Fabricantes */}
                    <CustomSelect
                        id="idFabricante"
                        label="Fabricante"
                        options={fabricantes.map(fabricante => ({
                            label: fabricante.nombre,
                            value: fabricante.id
                        }))}
                        error={errors.idFabricante}
                        {...register("idFabricante", {
                            required: "Seleccione un fabricante*"
                        })}
                    />
                </div>

                {/* Selector del tipo de producto */}
                < Controller
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

            <div className={styles.buttonContainer}>

                <Button variant="buttonCancel" parentMethod={closeAction}>
                    Cancelar
                    <TrashIcon />
                </Button>


                <Button variant="buttonAccept" type="submit">
                    Aceptar
                    <CheckIcon />
                </Button>

            </div>
        </form>
    )
}