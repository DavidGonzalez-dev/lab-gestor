import styles from "./Input.module.css";

export const Input = ({ type, label, id, error, placeHolder, options = [], hasServerError, variant="", ...rest }) => {
  return (
    <div className={`${styles.customInput} ${styles[variant]}`}>
      <label htmlFor={id}>{label}</label>

      {type === "select" ? (
        <select
          id={id}
          className={(error || hasServerError) ? styles.invalidContent : ""}
          {...rest}
        >
          <option value="">Seleccione una opción</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeHolder}
          autoComplete="off"
          className={(error || hasServerError) ? styles.invalidContent : ""}
          {...rest}
        />
      )}

      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
};
