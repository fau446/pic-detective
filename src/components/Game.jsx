import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Dropdown from "./Dropdown";

function Game() {
  const { gameID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

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

  function toggleDropdown(e) {
    if (displayDropdown) {
      setDisplayDropdown(false);
    } else {
      const { clientX, clientY } = e;
      setDropdownPosition({ x: clientX, y: clientY });
      setDisplayDropdown(true);
    }
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
          <div onClick={toggleDropdown}>
            <p>Image Goes Here!</p>
          </div>
          {displayDropdown && (
            <Dropdown coords={dropdownPosition} options={characters} />
          )}
        </div>
      </>
    );
  }
}

export default Game;
