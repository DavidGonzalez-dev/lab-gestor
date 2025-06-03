import Swal from "sweetalert2";

export const ConfirmAlert = Swal.mixin({
    icon: "question",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#22861e",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#cf171d",
    scrollbarPadding: false,
    heightAuto: false,
})

export const SuccessAlert = Swal.mixin({
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#22861e",
    scrollbarPadding: false,
    heightAuto: false,


export const ErrorAlert = Swal.mixin({
    icon: "error",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#cf171d",
    scrollbarPadding: false,
    heightAuto: false,
})