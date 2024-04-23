import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Game() {
  const { gameID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

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

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <h1>{gameID}</h1>
        <p>Game</p>
      </div>
    );
  }
}

export default Game;
