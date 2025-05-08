import styles from "./Button.module.css";

export const Button = ({ children, parentMethod=null, type ="button", variant="" }) => {
  return (
    <button
      onClick={parentMethod}
      type={type}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};
