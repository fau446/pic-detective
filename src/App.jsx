import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // temporary test function
    async function fetchGames() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGames([
          {
            _id: "Id1",
            name: "Game 1",
            imageURL: "URL 1",
            characters: [
              { name: "Bob", xCoord: 2, yCoord: 65 },
              { name: "Jane", xCoord: 123, yCoord: 127 },
            ],
          },
          {
            _id: "Id2",
            name: "Game 2",
            imageURL: "URL 2",
            characters: [{ name: "Brad", xCoord: 92, yCoord: 12 }],
          },
        ]);
        setIsLoading(false);
        console.log("Games fetched successfully");
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }

    fetchGames();
  }, []);

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Home games={games} isLoading={isLoading} />}
            />
            <Route path="/game/:gameID" element={<Game />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
