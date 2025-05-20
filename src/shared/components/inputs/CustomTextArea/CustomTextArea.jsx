import styles from "./CustomTextArea.module.css"

export const CustomTextArea = ({ label, id, error, placeHolder, ...rest }) => {
  return (
    <div className={`${styles.customTextArea}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeHolder}
        autoComplete="off"
        className={error ? styles.invalidContent : ""}
        {...rest}
      />
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
};