import "./styles.css";
import { useState, useEffect } from "react";

const Popup = ({ appInfo, appId, activeUser, trigger, setTrigger }) => {
  const SetTrigToFalse = () => {
    setTrigger(false);
  };

  const [isAppPurchased, setIsAppPurchased] = useState();
  const [isAppReviwed, setIsAppReviwed] = useState();
  const [toggleAddReview, setToggleAddReview] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(0);
  const [fetchDone, setFetchDone] = useState(false);

  useEffect(() => {
    async function initialFetch() {
      const isPurchased = await fetch(
        `http://localhost:5000/purchases/isAppPurchased/${activeUser.id}/${appId}`
      );
      const isReviwed = await fetch(
        `http://localhost:5000/reviews/isAppReviewed/${activeUser.id}/${appId}`
      );

      const responses = await Promise.all([isPurchased, isReviwed]);
      const json = responses.map((response) => response.json());
      const data = await Promise.all(json);

      const isPurchasedJson = data[0];
      const isReviwedJson = data[1];

      setIsAppPurchased(isPurchasedJson);
      setIsAppReviwed(isReviwedJson);
      setToggleAddReview(false);
      setFetchDone(true);
    }
    initialFetch();
  }, []);

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
    let purchaseId = await fetch(
      `http://localhost:5000/purchases/getPurchaseId/${activeUser.id}/${appId}`
    );
    let purchaseIdJson = await purchaseId.json();
    const data = {
      data: {
        id_app: appId,
        id_user: activeUser.id,
        id_compra: purchaseIdJson,
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
    setIsAppReviwed(true);
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
                {Math.round(
                  appInfo.reviews.reduce(
                    (partialSum, next) => partialSum + next.nota,
                    0
                  ) / appInfo.reviews.length
                )}
                / 5
              </span>
            </div>

            <span className="appPrice">R${appInfo.preco},00</span>
          </div>

          <div className="reviewsContainer">
            <h1 className="reviewsTitle">Avaliações</h1>
            {appInfo.reviews.map((review) => (
              <div className="reviewItem">
                <span className="userReviewer">{review.usuario}</span>
                <span className="reviewNote">{review.nota} / 5</span>
              </div>
            ))}
          </div>
          {fetchDone && (
            <>
              <div className="btnsContainer">
                {isAppReviwed ? (
                  ""
                ) : (
                  <>
                    {isAppPurchased ? (
                      <>
                        {toggleAddReview ? (
                          <>
                            <span>
                              <input
                                min={0}
                                max={10}
                                className="newReviewBtn"
                                type="number"
                                onChange={(e) => setReviewAdded(e.target.value)}
                              />{" "}
                              / 5
                            </span>
                            <input
                              className="submit"
                              type="submit"
                              onClick={postReview}
                            />
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
                      <>
                        <button className="buyAppBtn" onClick={buyApp}>
                          Comprar
                        </button>
                      </>
                    )}
                  </>
                )}
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
