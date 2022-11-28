import "./styles.css";
import { useState, useEffect } from "react";

const Popup = ({ appId, trigger, setTrigger, activeUser }) => {
  const SetTrigToFalse = () => {
    setTrigger(false);
  };

  const [toggleAddReview, setToggleAddReview] = useState(false);
  const [appInfo, setAppInfo] = useState();

  useEffect(() => {
    async function fetchAllApps() {
      const res = await fetch(
        `http://localhost:5000/apps/getAppFullInfo/${appId}`
      );
      const resJson = await res.json();
      setAppInfo(resJson.app[0]);
    }
    fetchAllApps();
  }, []);

  return trigger && appInfo ? (
    <>
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
                  <h1>{appInfo.nome}</h1>
                  <h2>{appInfo.nome_empresa}</h2>
                  <p>{appInfo.descricao}</p>
                  <span>
                    {appInfo.reviews.reduce(
                      (partialSum, next) => partialSum + next.nota,
                      0
                    ) / appInfo.reviews.length}
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

                <span className="appPrice">R${appInfo.preco}</span>
              </div>

              <div className="reviewsContainer">
                <h1 className="reviewsTitle">Avaliacoes</h1>
                {appInfo.reviews.map((review) => (
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
    </>
  ) : (
    ""
  );
};

export default Popup;
