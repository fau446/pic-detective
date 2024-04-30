import { useState } from "react";
import API_URL from "../assets/api-url";
import { useParams, useNavigate } from "react-router-dom";

function GameOver({ formattedTime, time }) {
  const navigate = useNavigate();
  const { gameID } = useParams();
  const [errors, setErrors] = useState(null);
  const [name, setName] = useState("");

  function handleInputChange(e) {
    setName(e.target.value);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/submit-score/${gameID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, time }),
      });
      const jsonData = await response.json();
      if (jsonData.errors) {
        setErrors(jsonData.errors);
        return;
      }

      navigate(`/leaderboard/${gameID}`);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(`GameID: ${gameID}`);

  return (
    <div>
      <h2>You found them all!</h2>
      <p>Your time was: {formattedTime}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Enter your name:</label>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={name}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default GameOver;
