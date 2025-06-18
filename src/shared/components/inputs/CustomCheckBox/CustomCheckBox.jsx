import styles from './CustomCheckBox.module.css';

export const CustomCheckBox = ({label, name, id, onChange}) => {
    return (
        <div className={styles.checkboxContainer}>
            <input type="checkbox" id={id} name={name} className={styles.checkboxInput} onChange={onChange} />
            <label htmlFor={id} className={styles.checkboxLabel}>{label}</label>
        </div>
    );
}