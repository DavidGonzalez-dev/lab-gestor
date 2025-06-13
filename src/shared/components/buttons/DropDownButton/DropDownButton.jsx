import { useEffect, useRef } from "react"

import { Plus } from "@shared/iconos"

import styles from "./DropDownButton.module.css"

export const DropDownButton = ({ isOpen, onToggle, options, onSelect }) => {
    // Referencia del dropdown
    const dropdownRef = useRef(null)


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            onToggle()
        }
    }

    // Cerrar el Dropdown cuando se haga click afuera
    useEffect(() => {

        if (isOpen) {
           document.addEventListener("mousedown", handleClickOutside) 
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [isOpen])

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <button className={`${styles.dropdownButton} ${isOpen ? styles.active : ""}`} onClick={onToggle} aria-expanded={isOpen} aria-haspopup="true">
                <Plus className={isOpen ? styles.open : ""}/>
                Crear
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {options.map(option => (
                        <button
                            key={option.id}
                            className={styles.dropdownOption}
                            onClick={() => onSelect(option.id)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )

}