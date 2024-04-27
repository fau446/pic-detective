import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../assets/api-url";
import styles from "../styles/Game.module.css";
import pic from "../../public/zombie_waldo.jpeg";
import Nav from "./Nav";
import Dropdown from "./Dropdown";

function Game() {
  const { gameID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameDetails, setGameDetails] = useState({});
  const [characters, setCharacters] = useState([]);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [targetBox, setTargetBox] = useState([]);

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const response = await fetch(`${API_URL}/game/${gameID}`);
        const jsonData = await response.json();

        const charactersData = jsonData.game.characters.map((character) => ({
          ...character,
          found: false,
        }));

        setGameDetails(jsonData.game);
        setCharacters(charactersData);
        setIsGameActive(true);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }

    fetchGameDetails();
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
        <Nav
          isGameActive={isGameActive}
          characters={characters}
          gameTitle={gameDetails.name}
        />
        <div>
          <div className={styles.playArea}>
            <img
              className={styles.img}
              onClick={handleClick}
              src={"../../public/" + gameDetails.img_name}
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
