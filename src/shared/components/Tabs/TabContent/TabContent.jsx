import styles from './TabContent.module.css';

export const TabContent = ({ children, isActive=false }) => {
  return (
    <div className={`${styles.tabContent} ${isActive ? styles.active : ''}`}>
      {children}
    </div>
  );
}