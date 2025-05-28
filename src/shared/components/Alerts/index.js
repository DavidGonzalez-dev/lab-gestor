import Swal from "sweetalert2";

export const SuccessAlert = Swal.mixin({
    icon: "success",
    confirmButtonColor: "#22861e",
    heightAuto: false,
    scrollbarPadding: false,
})

export const ErrorAlert = Swal.mixin({
    icon: "error",
    confirmButtonColor: "#cf171d",
    heightAuto: false,
    scrollbarPadding: false,
})

export const ConfirmAlert = Swal.mixin({
    icon: "question",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#22861e",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#cf171d",
    heightAuto: false,
    scrollbarPadding: false,
})