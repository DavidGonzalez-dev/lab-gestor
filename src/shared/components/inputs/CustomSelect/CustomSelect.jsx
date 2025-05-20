import styles from "./CustomSelect.module.css";

export const CustomSelect = ({ label, id, error, options = [], hasServerError, variant = "", ...rest }) => {
  return (
    <div className={`${styles.customSelect} ${styles[variant]}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        defaultValue=""
        className={(error || hasServerError) ? styles.invalidContent : ""}
        {...rest}
      >
        <option value="" disabled>Seleccione una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
};
