import "./Button.css";

export const Button = ({ children, parentMethod, type, className }) => {
  return (
    <button onClick={parentMethod} type={type} className={`button ${className}`}>{children}</button>
  );
};

