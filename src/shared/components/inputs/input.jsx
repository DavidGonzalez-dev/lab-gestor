import "./Input.css"

export const Input = ({ type, label, id, error, placeHolder, parentMethod, ...rest }) => {
    return (
        <>
            <div className="customInput">
                <label htmlFor={id}>{label}</label>
                <input type={type} id={id} placeholder={placeHolder} onChange={parentMethod} autoComplete="off" className={error ? "invalidContent" : ""} {...rest}/>
                {error && <p className="errorMessage">{error.message}</p>}
            </div>
        </>
    )
}