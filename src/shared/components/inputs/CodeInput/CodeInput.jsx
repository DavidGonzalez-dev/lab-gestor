import styles from "./CodeInput.module.css"

import { Controller } from "react-hook-form"
import { useEffect, useRef, useState } from "react"

export const CodeInput = ({ name, length, control, error, label, rules }) => {

    const [code, setCode] = useState(Array(length).fill(""))
    const inputRefs = useRef([])

    // Maneja el cambio de estado para actualizar el valor del codigo
    const handleChange = (value, index, changeControllerValue) => {
        // Revisamos que sea un numero
        if (!/^\d*$/.test(value)) {
            return
        }

        // Actualizamos el codigo
        let newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Actualizamos el valor en el controlador de react-hook-form
        changeControllerValue(newCode.join(""))

        // Movemos al siguiente input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }

    }

    // Manejamos las teclas que pueda oprimir el usuario
    const handleKeyDown = (e, index, onChange) => {

        // Manejar BackSpace
        if (e.key === "Backspace") {

            e.preventDefault()
            let newCode = [...code]
            newCode[index] = ""
            setCode(newCode)
            console.log(newCode)
            onChange(newCode.join(""))

            if (index > 0) {
                inputRefs.current[index - 1]?.focus()
            }

        }

        // Manejar Arrow Left
        else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }

        // Manejar ArrowRight
        else if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }

    }

    // Manejamos el pegado del clipboard del codigo
    const handlePaste = (e, onChange) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, '')

        // Verificamos que el codigo sea menor o igual a la longitud del input
        if (pastedData.length <= length) {

            const newCode = Array(length).fill("")
            for (const index in pastedData) {
                newCode[index] = pastedData[index]
            }

            // Se actualiza el estado 
            setCode(newCode)
            onChange(pastedData)

            // Se mueve el focus al siguiente campo libre
            inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus()
        }
    }

    //Enfocar el primer input al montar el componente
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus()
        }
    }, [])

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange } }) => (
                <div className={styles.codeInputContainer}>

                    <label>{label}</label>

                    <div className={styles.inputContainer}>
                        {code.map((number, index) => (
                            <input
                                key={index}
                                ref={(el) => inputRefs.current[index] = el}
                                type="text"
                                maxLength={1}
                                value={number}
                                onChange={(e) => handleChange(e.target.value, index, onChange)}
                                onKeyDown={(e) => handleKeyDown(e, index, onChange)}
                                onPaste={(e) => handlePaste(e, onChange)}
                                className={`${styles.codeInput} ${error ? styles.invalid : ""}`}
                            />
                        ))}
                    </div>

                </div>
            )}
        />
    )
}