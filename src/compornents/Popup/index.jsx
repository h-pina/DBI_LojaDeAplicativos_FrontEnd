import "./styles.css";
import appInfo from "../../mocks/appFullDescriptionMock.json"

const Popup = ({ trigger, setTrigger }) => {
  const SetTrigToFalse = () => {
    setTrigger(false);
  };

  function updateUserBalance(price){

  }  

  return trigger ? (
    <div className="popupContainer">
      <div className="popup">
        <h1>{appInfo.app.name}</h1>
        <h2>{appInfo.app.nome_empresa}</h2>
        <p>{appInfo.app.descricao}</p>
        <span>{appInfo.app.reviews.reduce((partialSum, next) => partialSum + next.nota,0) / appInfo.app.reviews.length}</span>
        <div></div>
        <h1>Avaliacoes</h1>
        <div className="reviewsContainer">
          {appInfo.app.reviews.map((review) => (
              <div>
                <span>{review.usuario}</span>
                <span>{review.nota}</span>
              </div>
              ))}
        </div>
        <button onClick={SetTrigToFalse}>Fechar</button>
        <button onClick={updateUserBalance}>Comprar</button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
