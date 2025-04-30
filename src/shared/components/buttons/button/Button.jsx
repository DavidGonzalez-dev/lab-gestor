import "./Button.css";
import "@shared/styles/variables.css";

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
  );
};

export default Button;
