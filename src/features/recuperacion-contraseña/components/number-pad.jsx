import React from "react"
import { InitNumericPad } from "../utils/initNumberPad.js"
import "../styles/styles.css"

export default function NumericPad() {
    const {
        code,
        handleNumberClick,
        handleKeyDown,
        handleClear,
        inputRefs
    } = InitNumericPad()

    return (

        <div className="numeric-pad-container">
            {/* Entrada de digitos */}
            <div id="codigo">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        value={digit}
                        maxLength={1}
                        ref={(el) => inputRefs.current[index] = el}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="digit"
                    />
                ))}
            </div>
            {/* Pad de numeros  */}
            <div id="pad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(num.toString())}
                        className="numeric-pad-button"
                    >
                        {num}
                    </button>
                ))}
                <a
                    href="NuevaContrasena"
                    className="numeric-pad-button"
                    id="boton-aceptar"
                >
                    Aceptar
                </a>
                <button
                    onClick={handleClear}
                    className="numeric-pad-button"
                    id="boton-borrar"
                >
                    Borrar
                </button>
            </div>
        </div>

    )
}




