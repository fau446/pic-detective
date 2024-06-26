import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../assets/api-url";
import styles from "../styles/Game.module.css";
import Nav from "./Nav";
import Notification from "./Notification";
import Dropdown from "./Dropdown";
import GameOver from "./GameOver";

function Game() {
  const { gameID } = useParams();
  const [error, setError] = useState(null);
  const [navHeight, setNavHeight] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(200);
  const [dropdownWidth, setDropdownWidth] = useState(150);
  const [isLoading, setIsLoading] = useState(true);
  const [isFound, setIsFound] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameDetails, setGameDetails] = useState({});
  const [characters, setCharacters] = useState([]);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [targetBox, setTargetBox] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);

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
        setError(err);
      }
      setIsLoading(false);
    }

    fetchGameDetails();
  }, []);

  useEffect(() => {
    checkGameCompletion();
  }, [characters]);

  useEffect(() => {
    if (isGameActive && !isGameOver) {
      const interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isGameActive, isGameOver]);

  function handleClick(e) {
    if (displayDropdown) {
      setDisplayDropdown(false);
    } else {
      const imageWidth = e.target.width;
      const imageHeight = e.target.height;
      let { pageX, pageY } = e;
      const relativeX = Math.floor((e.nativeEvent.offsetX / imageWidth) * 100);
      const relativeY = Math.floor((e.nativeEvent.offsetY / imageHeight) * 100);
      const coordArray = generateTargetBoxCoords(relativeX, relativeY);

      if (!isWithinXCoords(imageWidth, pageX)) pageX = pageX - dropdownWidth;
      if (!isWithinYCoords(imageHeight, pageY - navHeight))
        pageY = pageY - dropdownHeight;

      setDropdownPosition({ x: pageX, y: pageY });
      setTargetBox(coordArray);
      setDisplayDropdown(true);
    }
  }

  async function handleOptionSelect(characterID, characterName) {
    setDisplayDropdown(false);
    try {
      const response = await fetch(`${API_URL}/character/${characterID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetBox }),
      });
      const jsonData = await response.json();

      if (jsonData.characterFound) {
        setCharacters((prevCharacters) =>
          prevCharacters.map((character) =>
            character._id === characterID
              ? { ...character, found: true }
              : character
          )
        );
        setIsFound(true);
        setNotificationMsg(`${characterName} has been found!`);
      } else {
        setIsFound(false);
        setNotificationMsg("Try again!");
      }
      setDisplayNotification(true);

      setTimeout(() => {
        setDisplayNotification(false);
      }, 2000);
    } catch (err) {
      setError(err);
    }
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

  function checkGameCompletion() {
    if (!isGameActive) return;

    const charactersNotFound = characters.filter(
      (character) => !character.found
    );

    if (charactersNotFound.length === 0) {
      setIsGameOver(true);
    }
  }

  function formatTime(secs) {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const remainingSecs = secs % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      mins < 10 ? "0" + mins : mins
    }:${remainingSecs < 10 ? "0" + remainingSecs : remainingSecs}`;
  }

  function isWithinXCoords(imageWidth, xCoord) {
    return imageWidth - xCoord <= 200 ? false : true;
  }

  function isWithinYCoords(imageHeight, yCoord) {
    return imageHeight - yCoord <= 200 ? false : true;
  }

  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Nav
          isGameActive={isGameActive}
          characters={characters}
          gameTitle={gameDetails.name}
          stopwatch={formatTime(elapsedTime)}
          setNavHeight={setNavHeight}
        />
        {error && <p>{error.message}</p>}
        {isGameOver && (
          <GameOver
            formattedTime={formatTime(elapsedTime)}
            time={elapsedTime}
            setError={setError}
          />
        )}
        <div>
          <div className={styles.playArea}>
            <img
              className={styles.img}
              onClick={handleClick}
              src={"../../" + gameDetails.img_name}
              alt="something"
            />
          </div>
          {displayDropdown && (
            <Dropdown
              coords={dropdownPosition}
              options={characters}
              handleOptionSelect={handleOptionSelect}
              setDropdownHeight={setDropdownHeight}
              setDropdownWidth={setDropdownWidth}
            />
          )}
          {displayNotification && (
            <Notification isFound={isFound} message={notificationMsg} />
          )}
        </div>
      </>
    );
  }
}

export default Game;
