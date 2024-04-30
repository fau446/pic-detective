import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../assets/api-url";
import Nav from "./Nav";

function Leaderboard() {
  const { gameID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState([]);
  // fetch scores for the given gameID
  // in descending order (first score is the score with the lowest time)
  // scores = [{name, time, date}]
  useEffect(() => {
    async function fetchScores() {
      try {
        const response = await fetch(`${API_URL}/leaderboard/${gameID}`);
        const jsonData = await response.json();

        setScores(jsonData.scores);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchScores();
  }, []);

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
        <Nav isGameActive={false} />
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
      </>
    );
  }
}

export default Leaderboard;
