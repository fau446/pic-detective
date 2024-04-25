import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/Game.module.css";
import pic from "../../public/zombie_waldo.jpeg";
import Nav from "./Nav";
import Dropdown from "./Dropdown";

function Game() {
  const { gameID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [targetBox, setTargetBox] = useState([]);

  useEffect(() => {
    // fetch characters test function
    // use gameID as search criteria
    async function fetchCharacters() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCharacters([
          { _id: "Char1", name: "Bob", found: true },
          { _id: "Char2", name: "Jane", found: false },
        ]);
        setIsLoading(false);
        setIsGameActive(true);
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }

    fetchCharacters();
  }, []);

  function handleClick(e) {
    if (displayDropdown) {
      setDisplayDropdown(false);
    } else {
      console.log(e);
      const imageWidth = e.target.width;
      const imageHeight = e.target.height;
      const { pageX, pageY } = e;
      const relativeX = Math.floor((e.nativeEvent.offsetX / imageWidth) * 100);
      const relativeY = Math.floor((e.nativeEvent.offsetY / imageHeight) * 100);
      const coordArray = generateTargetBoxCoords(relativeX, relativeY);

      setDropdownPosition({ x: pageX, y: pageY });
      setTargetBox(coordArray);
      setDisplayDropdown(true);
    }
  }

  function handleOptionSelect(id) {
    setDisplayDropdown(false);
    // pass id and targetBox to backend.
  }

  function generateTargetBoxCoords(xCoord, yCoord) {
    let coordArray = [];
    for (let i = xCoord - 5; i < xCoord + 5; i++) {
      for (let j = yCoord - 5; j < yCoord + 5; j++) {
        coordArray.push([i, j]);
      }
    }
    return coordArray;
  }

  if (isLoading) {
    return (
      <>
        <Nav />
        <p>Loading...</p>
      </>
    );
  } else {
    return (
      <>
        <Nav isGameActive={isGameActive} characters={characters} />
        <div>
          <h1>{gameID}</h1>
          <p>Game</p>
          <div className={styles.playArea}>
            <img
              className={styles.img}
              onClick={handleClick}
              src={pic}
              alt="something"
            />
          </div>
          {displayDropdown && (
            <Dropdown
              coords={dropdownPosition}
              options={characters}
              handleOptionSelect={handleOptionSelect}
            />
          )}
        </div>
      </>
    );
  }
}

export default Game;
