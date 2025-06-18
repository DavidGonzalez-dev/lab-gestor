import styles from './ComponentLoader.module.css';

export const ComponentLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <span className={styles.label}>Cargando...</span>
    </div>
  );
};