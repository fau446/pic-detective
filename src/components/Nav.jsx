import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Nav.module.css";

function Nav({ isGameActive, characters, gameTitle, stopwatch, setNavHeight }) {
  const navRef = useRef(null);
  const [src, setSrc] = useState("../../github-mark.png");

  useEffect(() => {
    if (navRef.current && setNavHeight) {
      const height = navRef.current.offsetHeight;
      setNavHeight(height);
    }
  }, []);

  return (
    <div className={styles.nav} ref={navRef}>
      <div className={styles.top}>
        <Link to="/">
          <h1 className={styles.logo}>Pic Detective</h1>
        </Link>
        {isGameActive ? (
          <>
            <h2 className={styles.title}>{gameTitle}</h2>
            <p className={styles.stopwatch}>{stopwatch}</p>
          </>
        ) : (
          <a href="https://github.com/fau446/pic-detective" target="_blank">
            <img
              className={styles.icon}
              src={src}
              onMouseOver={() => setSrc("../../github-mark-white.png")}
              onMouseOut={() => setSrc("../../github-mark.png")}
            />
          </a>
        )}
      </div>
      {isGameActive && (
        <div className={styles.bottom}>
          <ul>
            {characters.map((character) => {
              return (
                <li className={styles.characters} key={character._id}>
                  <img
                    className={styles.icon}
                    src={"../../" + character.img_name}
                  />
                  <p>{character.name}</p>
                  <img
                    className={styles.icon}
                    src={
                      "../../" +
                      (character.found ? "correct.png" : "incorrect.png")
                    }
                    alt={character.found.toString()}
                  />
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
