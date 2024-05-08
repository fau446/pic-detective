import styles from "../styles/Home.module.css";
import Nav from "./Nav";
import Card from "./Card";

function Home({ games, isLoading }) {
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
      <div className={styles.flex}>
        <Nav isGameActive={false} />
        <div className={styles.home}>
          {games.map((game) => {
            return (
              <Card
                key={game._id}
                name={game.name}
                img_name={game.img_name}
                gameID={game._id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
