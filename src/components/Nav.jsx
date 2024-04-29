import { Link } from "react-router-dom";
import styles from "../styles/Nav.module.css";

function Nav({ isGameActive, characters, gameTitle, stopwatch }) {
  // Stopwatch should display only if isGameActive
  return (
    <div className={styles.nav}>
      <div className={styles.top}>
        <Link to="/">
          <h1>Pic Detective</h1>
        </Link>
        {isGameActive && (
          <>
            <h2>{gameTitle}</h2>
            <p>{stopwatch}</p>
          </>
        )}
      </div>
      {isGameActive && (
        <div className={styles.bottom}>
          <ul>
            {characters.map((character) => {
              return (
                <li key={character._id}>
                  <p>{character.name}</p>
                  <p>{character.found ? "Found" : "Not Found"}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;
