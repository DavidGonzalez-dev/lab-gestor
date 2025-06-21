import styles from './Tab.module.css';

export const Tab = ({ children, isActive=false, onClick }) => {
  return (
    <button className={`${styles.tab} ${isActive ? styles.active : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}