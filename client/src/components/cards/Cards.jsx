import Card from "../card/Card";
import "./Cards.css";

const Cards = ({ Videogames, onClose, onCardClick, showCloseButton, deleteGame, loadings }) => {
  Videogames ? Videogames : [];
  

  return (
    <div className="box">
      {Videogames.length >= 2 ? (
        Videogames.map((videogame, index) => {
          if (!videogame) return null;
          const key = videogame.id ? videogame.id : `random-${index}`;
          return (
            <div className="cuerpo" key={key}>
              {showCloseButton && (
                <button onClick={() => console.log("cerrar")} className="close-button">
                  cerrar
                </button>
              )}
              <Card
                id={key}
                name={videogame.name}
                image={videogame.background_image}
                genre={videogame.genres}
                videogame={videogame}
                onClose={onClose}
                onCardClick={onCardClick}
                deleteGame={deleteGame}
                loadings={loadings}
              />
            </div>
          );
        })
      ) : (
        Videogames && (
            <div className="cuerpo" >
              {showCloseButton && (
                <button onClick={() => console.log("cerrar")} className="close-button">
                  cerrar
                </button>
              )}
              <Card
                id={Videogames.id}
                name={Videogames.name}
                image={Videogames.background_image}
                genre={Videogames.genres}
                videogame={Videogames}
                onClose={onClose}
                onCardClick={onCardClick}
                deleteGame={deleteGame}
                loadings={loadings}
              />
            </div>
        )
      )}
    </div>
  );
};

export default Cards;
