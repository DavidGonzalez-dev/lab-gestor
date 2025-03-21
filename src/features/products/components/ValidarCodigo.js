if (typeof window !== "undefined") {
    let code = "";

    function addDigit(digit) {
        if (code.length < 6) {
            code += digit;
            document.getElementById("codeField").value = code;
        }
    }

    function removeDigit() {
        code = code.slice(0, -1);
        document.getElementById("codeField").value = code;
    }

    function confirmCode() {
        if (code.length === 6) {
            alert("Código ingresado: " + code);
        } else {
            alert("Por favor ingrese un código válido");
        }
    }

    // Hacer funciones accesibles en el contexto global
    window.addDigit = addDigit;
    window.removeDigit = removeDigit;
    window.confirmCode = confirmCode;
}
