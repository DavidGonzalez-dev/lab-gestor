import styles from './progressBar.module.css';

export default function ProgressBar({ pasoActual, totalPasos }) {
  const pasos = Array.from({ length: totalPasos }, (_, i) => i + 1);

  return (
    <div className={styles.stepper}>
      {pasos.map((paso) => (
        <div
          key={paso}
          className={`${styles.step} ${pasoActual === paso ? styles.active : ''} ${pasoActual > paso ? styles.completed : ''}`}
        >
          <div className={styles.circle}>{paso}</div>
        </div>
      ))}
    </div>
  );
}

