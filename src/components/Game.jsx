import { useState } from "react";
import { useParams } from "react-router-dom";

function Game() {
  const { gameID } = useParams();

  return (
    <div>
      <h1>{gameID}</h1>
      <p>Game</p>
    </div>
  );
}

export default Game;
