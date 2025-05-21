import styles from "./Input.module.css";

export const Input = ({ type, label, id, error, placeHolder, hasServerError, variant = "", ...rest }) => {
  return (
    <div className={`${styles.customInput} ${styles[variant]}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeHolder}
        autoComplete="off"
        className={(error || hasServerError) ? styles.invalidContent : ""}
        {...rest}
      />
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
};
