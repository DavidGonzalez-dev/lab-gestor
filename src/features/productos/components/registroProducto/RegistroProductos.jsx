import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import Input from "../shared/Input"; // Ajusta si tu ruta es diferente
import Button from "../shared/Button";
import SelectButton from "../shared/SelectButton";
import { ProductosIcon, CajaIcon, BotellaIcon, TrashIcon, CheckIcon } from "../shared/iconos";
import styles from "../styles/Form.module.css";

export default function FormularioRegistroProducto({ onSubmit, onError, redirectPrevious }) {
  const [pasoActual, setPasoActual] = useState(1);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    mode: "onTouched",
  });

  const avanzarPaso = async () => {
    const valid = await trigger();
    if (!valid) {
      Swal.fire("Faltan campos obligatorios", "Completa los campos requeridos.", "error");
      return;
    }
    setPasoActual((prev) => prev + 1);
  };

  const retrocederPaso = () => {
    setPasoActual((prev) => prev - 1);
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit(onSubmit, onError)}>
      <h2>Formulario Registro Producto</h2>

      {/* Paso 1: Información General */}
      {pasoActual === 1 && (
        <div className="row">
          <div className="col-md-6">
            <h3>Información General</h3>
            <Input
              type="text"
              label="# Registro"
              id="registro"
              placeHolder="ej:1099543570"
              error={errors.registro}
              {...register("registro", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Solo números",
                },
              })}
            />
            <Input
              type="text"
              label="Nombre Producto"
              id="nombreProducto"
              error={errors.nombreProducto}
              {...register("nombreProducto", {
                required: "Campo requerido",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Solo letras y espacios",
                },
              })}
            />
            <Input
              type="text"
              label="Descripción del Producto"
              id="descripcionProducto"
              error={errors.descripcionProducto}
              {...register("descripcionProducto", {
                required: "Campo requerido",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Solo letras y espacios",
                },
              })}
            />
          </div>
        </div>
      )}

      {/* Paso 2: Proveedores */}
      {pasoActual === 2 && (
        <div className="row">
          <div className="col-md-6">
            <h3>Información Proveedores</h3>
            <Input
              type="select"
              label="Cliente"
              id="cliente"
              options={[
                { value: "cliente1", label: "Cliente 1" },
                { value: "cliente2", label: "Cliente 2" },
              ]}
              error={errors.cliente}
              {...register("cliente", { required: "Campo obligatorio" })}
            />
            <Input
              type="select"
              label="Nombre del Fabricante"
              id="fabricante"
              options={[
                { value: "fabricante1", label: "Fabricante 1" },
                { value: "fabricante2", label: "Fabricante 2" },
              ]}
              error={errors.fabricante}
              {...register("fabricante", { required: "Campo obligatorio" })}
            />
            <Input
              type="date"
              label="Fecha de Fabricación"
              id="fechaFabricacion"
              error={errors.fechaFabricacion}
              {...register("fechaFabricacion", { required: "Campo obligatorio" })}
            />
            <Input
              type="date"
              label="Fecha Vencimiento"
              id="fechaVencimiento"
              error={errors.fechaVencimiento}
              {...register("fechaVencimiento", { required: "Campo obligatorio" })}
            />
          </div>
        </div>
      )}

      {/* Paso 3: Información Adicional + Tipo Producto */}
      {pasoActual === 3 && (
        <>
          <div className="row">
            <div className="col-md-6">
              <h3>Información Adicional</h3>
              <Input
                type="text"
                label="Lote"
                id="lote"
                error={errors.lote}
                {...register("lote", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo números",
                  },
                })}
              />
              <Input
                type="text"
                label="Tamaño Lote"
                id="tamanoLote"
                error={errors.tamanoLote}
                {...register("tamanoLote", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo números",
                  },
                })}
              />
              <Input
                type="number"
                label="Cantidad"
                id="cantidad"
                error={errors.cantidad}
                {...register("cantidad", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo números",
                  },
                })}
              />
              <Input
                type="text"
                label="Presentación"
                id="presentacion"
                error={errors.presentacion}
                {...register("presentacion", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9\s.-]+$/,
                    message: "Texto alfanumérico válido",
                  },
                })}
              />
              <Input
                type="text"
                label="Compuesto"
                id="compuesto"
                error={errors.compuesto}
                {...register("compuesto", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9\s.-]+$/,
                    message: "Texto alfanumérico válido",
                  },
                })}
              />
              <Input label="Estado" id="estado" {...register("estado")} />
            </div>
          </div>

          <div className="col-md-12">
            <h3>Tipo Producto</h3>
            <Controller
              control={control}
              name="tipoProducto"
              rules={{ required: "Campo obligatorio" }}
              render={({ field: { value, onChange } }) => (
                <div className="row">
                  <div className="col-md-4">
                    <SelectButton
                      variant="orange"
                      selected={value === "materiaPrima"}
                      parentMethod={() => onChange("materiaPrima")}
                    >
                      Materia Prima <ProductosIcon />
                    </SelectButton>
                  </div>
                  <div className="col-md-4">
                    <SelectButton
                      variant="gray"
                      selected={value === "empaque"}
                      parentMethod={() => onChange("empaque")}
                    >
                      Material de Empaque <CajaIcon />
                    </SelectButton>
                  </div>
                  <div className="col-md-4">
                    <SelectButton
                      variant="blue"
                      selected={value === "terminado"}
                      parentMethod={() => onChange("terminado")}
                    >
                      Producto terminado <BotellaIcon />
                    </SelectButton>
                  </div>
                </div>
              )}
            />
          </div>
        </>
      )}

      {/* Botones de navegación */}
      <div className={styles.actionButtons}>
        {pasoActual > 1 && (
          <Button variant="buttonCancel" parentMethod={retrocederPaso}>
            Atrás
          </Button>
        )}
        {pasoActual < 3 && (
          <Button variant="buttonAccept" parentMethod={avanzarPaso}>
            Siguiente
          </Button>
        )}
        {pasoActual === 3 && (
          <>
            <Button variant="buttonCancel" parentMethod={redirectPrevious}>
              Cancelar <TrashIcon />
            </Button>
            <Button type="submit" variant="buttonAccept">
              Aceptar <CheckIcon />
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
