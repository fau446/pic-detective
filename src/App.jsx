import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import API_URL from "./assets/api-url";
import Home from "./components/Home";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch(`${API_URL}/`);
        const jsonData = await response.json();
        setGames(jsonData.games);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    }

    fetchGames();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div>
          {error && <p>{error}</p>}
          <Routes>
            <Route
              path="/"
              element={<Home games={games} isLoading={isLoading} />}
            />
            <Route path="/game/:gameID" element={<Game />} />
            <Route path="/leaderboard/:gameID" element={<Leaderboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
