import { useState } from "react"

export const useForm = (initialValues) => {

    const [values, setValues] = useState(initialValues) // Estado para guardar la informacion del form
    const [errors, setErrors] = useState({})              // Estado para trackear errores

    // Funcion para manejar el input de los usuarios en tiempo real
    const handleChange = (e) => {
        const { id, value } = e.target

        setValues((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    // Funcion para validar los campos del formulario y mapear los posibles errores en el estado del componente
    const validate = (validationRules) => {
        // Se crea una nueva variable para guardar los errores que se vayan presentando durante las validaciones
        let newErrors = {}

        // Iteramos por las reglas de validacion para validar los campos que aparecen en estas
        for (let field in validationRules) {

            // Caso en el que el usuario no halla ingresado ningun valor
            if (!values[field]) {
                newErrors[field] = `El campo ${field} es obligatorio*`
            }

            //Caso en el que no cumpla con las reglas pasadas
            else if (validationRules[field].regex && !validationRules[field].regex.test(values[field])) {
                newErrors[field] = validationRules[field].errorMessage
            }
        }
        
        return newErrors
    }


    // Funcion que maneja la logica para enviar el formulario
    const handleSubmit = async (callback, validationRules, values = null) => {

        // Se obtienen los errores actuales y el numero de errores
        const validationErrors = validate(validationRules)
        const errorNumber = Object.keys(validationErrors).length != 0

        // Se resetean el estado de los errores

        // Caso: Hay errores en el formulario
        setErrors(validationErrors)
        if (errorNumber != 0) {
            return
        }

        // Se ejecuta la funcion callback
        if (!values) {
            return callback()
        }
        return callback(values)

    }

    return { values, errors, handleChange, handleSubmit }
}