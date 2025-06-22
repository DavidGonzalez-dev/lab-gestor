// Funcion para Capitalizar palabras
export function ToTitleCase(string) {
    return string
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// Funcion para formatear las fechas
export function dateFormatter(date) {
    const formatDate = new Date(date)
    return formatDate.toLocaleDateString("es-ES")
}

// Funcion para formatear las fechas con hora
export function dateTimeFormatter(date){
    const formatDate = new Date(date).toISOString()

    const fechaLocal = formatDate.split("T")[0];
    const horaLocal = formatDate.split("T")[1].split(".")[0];

    return fechaLocal + "-" + horaLocal;
}

// Funcion de Comparador de Fechas para el filtro para tablas
export function getDateComparatorFunction() {
    return (filterDate, cellValue) => {
        if (!cellValue) return -1;

        // cellValue viene como string ISO, como "2025-04-22T00:00:00Z"
        const date = new Date(cellValue);
        const cellDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );

        // Comparación ignorando horas
        if (cellDate < filterDate) return -1;
        if (cellDate > filterDate) return 1;
        return 0;
    }
}

// Funcion para obtener la variante de pildora de un producto
export const getPillVariantProductType = (typeName) => {
    switch (typeName) {

        case "Producto Terminado":
            return "lightBlue"
        case "Material de Empaque":
            return "gray"
        case "Materia Prima":
            return "orange"
    }
}

// Funcion para obtener la variante de la pildora segun el estado del producto
export const getPillVariantProductState = (estado) => {
    switch (estado) {
        case "Pendiente":
            return "gray"
        case "En proceso":
            return "darkBlue"
        case "Terminado":
            return "green"
    }
}
