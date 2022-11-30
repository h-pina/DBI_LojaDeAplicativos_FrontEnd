import "./styles.css";
import { useState, useEffect } from "react";

const Popup = ({ appId, activeUser, trigger, setTrigger }) => {
  const SetTrigToFalse = () => {
    setTrigger(false);
  };

  const [appInfo, setAppInfo] = useState();
  const [isAppPurchased, setIsAppPurchased] = useState(false);
  const [isAppReviwed, setIsAppReviwed] = useState(false);
  const [toggleAddReview, setToggleAddReview] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(0);

  useEffect(() => {
    async function fetchAll() {
      const fullAppInfo = await fetch(
        `http://localhost:5000/apps/getAppFullInfo/${appId}`
      );
      const isPurchased = await fetch(
        `http://localhost:5000/purchases/isAppPurchased/${activeUser.id}/${appId}`
      );
      const isReviwed = await fetch(
        `http://localhost:5000/reviews/isAppReviewed/${activeUser.id}/${appId}`
      );

      const responses = await Promise.all([
        fullAppInfo,
        isPurchased,
        isReviwed,
      ]);
      const json = responses.map((response) => response.json());
      const data = await Promise.all(json);

      const fullAppInfoJson = data[0];
      const isPurchasedJson = data[1];
      const isReviwedJson = data[2];

      setAppInfo(fullAppInfoJson.app[0]);
      setIsAppPurchased(isPurchasedJson);
      setIsAppReviwed(isReviwedJson);
      setToggleAddReview(false);
    }
    fetchAll();
  });

  async function buyApp() {
    const data = {
      data: {
        id_app: appId,
        id_user: activeUser.id,
        valor: appInfo.preco,
      },
    };
    await fetch(`http://localhost:5000/purchases/purchaseApp`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setIsAppPurchased(true);
  }

  async function postReview() {
    const data = {
      data: {
        id_app: appId,
        id_user: activeUser.id,
        id_compra: "",
        nota: reviewAdded,
      },
    };
    //get purchase ID
    await fetch(`http://localhost:5000/reviews/addReview/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    isAppReviwed(true);
  }

  return trigger && appInfo ? (
    <>
      <div className="popupContainer">
        <div className="popup">
          <button className="closePopupBtn" onClick={SetTrigToFalse}>
            X
          </button>
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
            {isAppPurchased ? (
              <>
                {!isAppReviwed && toggleAddReview ? (
                  <>
                    <span>
                      <input
                        min={0}
                        max={10}
                        className="newReviewBtn"
                        type="number"
                        onChange={(e) => setReviewAdded(e.target.value)}
                      />{" "}
                      / 10
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
              </>
            ) : (
              <button className="buyAppBtn" onClick={buyApp}>
                Comprar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default Popup;
