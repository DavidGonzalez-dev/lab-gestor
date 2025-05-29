import { EditProductForm } from "../EditProductForm/EditProductForm";
import { PillType, Modal, Button } from "@shared/components";
import { EditIcon } from "@shared/iconos"

import {
    getPillVariantProductType,
    getPillVariantProductState,
} from "@shared/utils";

import styles from "./ProductCard.module.css"
import { useState } from "react";

export const ProductCard = ({ producto }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <article className={`p-5 ${styles.productCard}`}>

            {/* Header de la tarjeta de producto */}
            <div className={styles.header}>
                <div className={styles.title}>
                    <h2>{producto.nombre}</h2>
                    <PillType
                        variant={getPillVariantProductState(
                            producto.estado.nombreEstado,
                        )}
                        value={producto.estado.nombreEstado}
                    />
                </div>
                <h3>{producto.numeroRegistro}</h3>
                <div className={styles.typeContainer}>
                    <PillType
                        variant={getPillVariantProductType(producto.tipo.nombreTipo)}
                        value={producto.tipo.nombreTipo}
                    />
                </div>
            </div>

            {/* Contenedor de la informacion del producto */}
            <div className={styles.infoContainer}>
                <div className="row">
                    <div className="col-lg-6">
                        <p>
                            <b>Fecha Fabricacion: </b>
                            {
                                new Date(producto.fechaFabricacion).toLocaleDateString(
                                    "es-ES",
                                )
                            }
                        </p>
                        <p>
                            <b>Fecha Vencimiento: </b>
                            {
                                new Date(producto.fechaVencimiento).toLocaleDateString(
                                    "es-ES",
                                )
                            }
                        </p>
                        <p><b>Compuesto Activo: </b> {producto.compuestoActivo}</p>
                        <p><b>Presentacion: </b> {producto.presentacion}</p>
                        <p><b>Descripcion: </b> {producto.descripcion}</p>
                        
                    </div>
                    <div className="col-lg-6">
                        <p><b>Cantidad: </b> {producto.cantidad}</p>
                        <p><b>Numero de Lote: </b> {producto.numeroLote}</p>
                        <p><b>Tamaño de Lote: </b> {producto.tamanoLote}</p>
                        <p><b>Fabricante: </b> {producto.fabricante.nombre}</p>
                        <p><b>Cliente: </b> {producto.cliente.nombre}</p>

                    </div>
                </div>
            </div>

            <Button parentMethod={() => setIsModalOpen(true)}>
                Editar
                <EditIcon />
            </Button>

            {/* Modal para edicion de informacion del producto */}
            <Modal isOpen={isModalOpen} title="Editar Producto" onClose={closeModal}>
                <EditProductForm initialValues={producto} closeAction={closeModal}/>
            </Modal>
        </article >
    )
}