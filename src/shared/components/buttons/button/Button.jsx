import "./Button.css";
import "@shared/styles/variables.css";

const Button = ({ lable, parentMethod, type, className, Icon }) => {
  return (
    <button
      onClick={parentMethod}
      type={type}
      className={`button ${className}`}
    >
      {lable}
      {Icon && <span>{<Icon />}</span>}
    </button>
  );
};

export default Button;
