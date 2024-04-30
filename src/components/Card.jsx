import { Link } from "react-router-dom";

function Card({ name, imageURL, gameID }) {
  return (
    <div>
      <img src={imageURL} alt={name} />
      <p>{name}</p>
      <Link to={"leaderboard/" + gameID}>
        <button>Leaderboard</button>
      </Link>
      <Link to={"game/" + gameID}>
        <button>Start Game</button>
      </Link>
    </div>
  );
}

export default Card;
