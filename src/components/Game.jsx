import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dropdown from "./Dropdown";

function Game() {
  const { gameID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
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
          { _id: "Char1", name: "Bob" },
          { _id: "Char2", name: "Jane" },
        ]);
        setIsLoading(false);
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
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h1>{gameID}</h1>
        <p>Game</p>
        <div onClick={toggleDropdown}>
          <p>Image Goes Here!</p>
        </div>
        {displayDropdown && (
          <Dropdown
            coords={dropdownPosition}
            options={characters}
            handleOptionSelect={handleOptionSelect}
          />
        )}
      </div>
    );
  }
}

export default Game;
