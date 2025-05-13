import styles from "./Input.module.css";

<<<<<<< HEAD
export const Input = ({ type, label, id, error, placeHolder, options = [], hasServerError, ...rest }) => {
  return (
    <div className={styles.customInput}>
=======
<<<<<<< HEAD
export const Input = ({
  type,
  label,
  id,
  error,
  placeHolder,
  hasServerError,
  variant,
  disabled = false,
  ...rest
}) => {
  return (
    <>
      <div className={`${styles.customInput} ${styles[variant]}`}>
        <label htmlFor={id}>{label}</label>
=======
export const Input = ({ type, label, id, error, placeHolder, options = [], hasServerError, variant="", ...rest }) => {
  return (
    <div className={`${styles.customInput} ${styles[variant]}`}>
>>>>>>> serviciosId
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
<<<<<<< HEAD
=======
>>>>>>> b0fa768395129d9a73217f57cb7952f33c5f51a4
>>>>>>> serviciosId
        <input
          type={type}
          id={id}
          placeholder={placeHolder}
          autoComplete="off"
<<<<<<< HEAD
=======
<<<<<<< HEAD
          className={error || hasServerError ? styles.invalidContent : ""}
          disabled={disabled}
          {...rest}
        />
        {error && <p className={styles.errorMessage}>{error.message}</p>}
      </div>
    </>
=======
>>>>>>> serviciosId
          className={(error || hasServerError) ? styles.invalidContent : ""}
          {...rest}
        />
      )}

      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
<<<<<<< HEAD
=======
>>>>>>> b0fa768395129d9a73217f57cb7952f33c5f51a4
>>>>>>> serviciosId
  );
};
