import React, { useState, useRef } from 'react';

export function InitNumericPad() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleNumberClick = (number) => {
    const emptyIndex = code.findIndex(digit => digit === '');
    if (emptyIndex !== -1) {
      const newCode = [...code];
      newCode[emptyIndex] = number;
      setCode(newCode);

      // Mover el foco al siguiente input
      if (emptyIndex < 5 && inputRefs.current[emptyIndex + 1]) {
        inputRefs.current[emptyIndex + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    const key = event.key;

    // Permitir solo números
    if (/^\d$/.test(key)) {
      const newCode = [...code];
      newCode[index] = key;
      setCode(newCode);

      // Mover el foco al siguiente input
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    // Manejar Backspace
    if (key === 'Backspace') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);

      // Mover el foco al input anterior si está vacío
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleClear = () => {
    setCode(['', '', '', '', '', '']);
    // Enfocar el primer input después de limpiar
    inputRefs.current[0]?.focus();
  };

  return {
    code,
    handleNumberClick,
    handleKeyDown,
    handleClear,
    inputRefs
  };
}