import styles from "../styles/Notification.module.css";

function Notification({ isFound, message }) {
  const notificationClass = isFound ? styles.found : styles.notFound;

  return (
    <div className={`${styles.notification} ${notificationClass}`}>
      <img
        className={styles.icon}
        src={"../../" + (isFound ? "correct.png" : "incorrect.png")}
        alt={isFound.toString()}
      />
      <p>|</p>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
