import "./Button.css"

const Button = ({ lable, parentMethod, type }) => {
    return (
        <button onClick={parentMethod} type={type} className="button">{lable}</button>
    )
}

export default Button