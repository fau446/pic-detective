import { Link } from "react-router-dom";
import styles from "../styles/Card.module.css";

function Card({ name, img_name, gameID }) {
  console.log(img_name);
  return (
    <div className={styles.card}>
      <img src={"../../" + img_name} alt={name} />
      <div>
        <p>{name}</p>
        <div className={styles.buttons}>
          <Link to={"leaderboard/" + gameID}>
            <button>Leaderboard</button>
          </Link>
          <Link to={"game/" + gameID}>
            <button>Start Game</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
