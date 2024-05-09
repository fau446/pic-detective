import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/Leaderboard.module.css";
import API_URL from "../assets/api-url";
import Nav from "./Nav";

function Leaderboard() {
  const { gameID } = useParams();
  const [error, setError] = useState(null);
  const [gameName, setGameName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function fetchScores() {
      try {
        const response = await fetch(`${API_URL}/leaderboard/${gameID}`);
        const jsonData = await response.json();
        console.log(jsonData);
        setGameName(jsonData.gameName);
        setScores(jsonData.scores);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    fetchScores();
  }, []);

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
        <Nav isGameActive={false} />
        <div className={styles.leaderboard}>
          <h2>{gameName}</h2>
          {error && <p>{error.message}</p>}
          <table>
            <thead>
              <tr>
                <th>Placement</th>
                <th>Name</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score.name}</td>
                    <td>{score.time_formatted}</td>
                    <td>{score.date_formatted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Leaderboard;
