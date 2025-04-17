import "./input.css"

const Input = ({ type, name, id, parentMethod }) => {
    return (
        <>
            <div className="form-input">
                <label htmlFor={id}>{name}</label>
                <input type={type} name={name} id={id} placeholder={name} onChange={parentMethod} autoComplete="off"/>
            </div>
        </>
    )
}

export default Input