import Card from "./Card";

function Home({ games, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        {games.map((game) => {
          return (
            <Card
              key={game._id}
              name={game.name}
              imageURL={game.imageURL}
              gameID={game._id}
            />
          );
        })}
      </div>
    );
  }
}

export default Home;
