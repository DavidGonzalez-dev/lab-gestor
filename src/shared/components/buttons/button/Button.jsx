import styles from"./Button.module.css";

<<<<<<< HEAD
const Button = ({ label, parentMethod, type, className, Icon }) => {
  return (
    <button
      onClick={parentMethod}
      type={type}
      className={`button ${className}`}
    >
      {label}
      {Icon && <span>{<Icon />}</span>}
    </button>
=======
export const Button = ({ children, parentMethod, type, variant }) => {
  return (
    <button onClick={parentMethod} type={type} className={`${styles.button} ${styles[variant]}`}>{children}</button>
>>>>>>> d118b631dc01caf4e5cc1462ec2c2f72be64e990
  );
};

