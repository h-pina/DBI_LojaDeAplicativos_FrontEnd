import "./styles.css";
import appInfo from "../../mocks/appFullDescriptionMock.json";
import { useState, useEffect } from "react";

const Popup = ({ appId, trigger, setTrigger, activeUser }) => {
  const SetTrigToFalse = () => {
    setTrigger(false);
  };

  const [toggleAddReview, setToggleAddReview] = useState(false);

  /*useEffect(() => {
    async function fetchAllApps() {
      const res = await fetch("http://localhost:5000/apps/listAllApps");
      const resJson = await res.json();
      console.log(resJson);
      setAppList(resJson);
    }
    fetchAllApps();
  }, []);*/

  return trigger ? (
    <div className="popupContainer">
      <div className="popup">
        <button className="closePopupBtn" onClick={SetTrigToFalse}>
          X
        </button>
        {activeUser === "Admin" ? (
          <>{/*TODO: Create Add App form */}</>
        ) : (
          <>
            <div className="appInfo">
              <div className="appIcon" />
              <div className="appData">
                <h1>{appInfo.app.nome}</h1>
                <h2>{appInfo.app.nome_empresa}</h2>
                <p>{appInfo.app.descricao}</p>
                <span>
                  {appInfo.app.reviews.reduce(
                    (partialSum, next) => partialSum + next.nota,
                    0
                  ) / appInfo.app.reviews.length}{" "}
                  / 10
                </span>
                {toggleAddReview ? (
                  <>
                    <span>
                      <input className="newReviewBtn" type="number" /> / 10
                    </span>
                    <input className="submit" type="submit" />
                  </>
                ) : (
                  <>
                    <button
                      className="reviewAppBtn"
                      onClick={() => setToggleAddReview(true)}
                    >
                      Adicionar Avaliacao
                    </button>
                  </>
                )}
              </div>

              <span className="appPrice">R${appInfo.app.preco}</span>
            </div>

            <div className="reviewsContainer">
              <h1 className="reviewsTitle">Avaliacoes</h1>
              {appInfo.app.reviews.map((review) => (
                <div className="reviewItem">
                  <span>{review.usuario}</span>
                  <span>{review.nota} / 10</span>
                </div>
              ))}
            </div>
            <div className="btnsContainer">
              <button className="buyAppBtn">Comprar</button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
