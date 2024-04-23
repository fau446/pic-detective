import { Link } from "react-router-dom";

function Card({ name, imageURL, gameID }) {
  console.log(imageURL);
  return (
    <div>
      <img src={imageURL} alt={name} />
      <p>{name}</p>
      <Link to={"game/" + gameID}>
        <button>Start Game</button>
      </Link>
    </div>
  );
}

export default Card;
