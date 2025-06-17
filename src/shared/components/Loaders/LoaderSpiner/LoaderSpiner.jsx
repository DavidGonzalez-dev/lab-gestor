import styles from './LoaderSpiner.module.css';

export const LoaderSpiner = ({ variant }) => {
    return (
        <div className={styles.loader} variant={variant}></div>
    );
};
