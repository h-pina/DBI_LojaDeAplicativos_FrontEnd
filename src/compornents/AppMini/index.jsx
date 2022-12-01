import Popup from "../Popup";
import PopupAdmin from "../PopupAdmin";
import { useState, useEffect } from "react";
import "./styles.css";

const AppMini = ({ appInfo, activeUser }) => {
  const [trigger, setTrigger] = useState(false);
  const [fullAppInfo, setFullAppInfo] = useState();

  useEffect(() => {
    async function initialFetch() {
      const fullAppInfo = await fetch(
        `http://localhost:5000/apps/getAppFullInfo/${appInfo.id}`
      );

      let fullAppInfoJson = await fullAppInfo.json();
      setFullAppInfo(fullAppInfoJson.app[0]);
    }
    initialFetch();
  }, []);

  const openPopup = () => {
    setTrigger(true);
  };

  return (
    fullAppInfo && (
      <>
        <div className="appMini" onClick={openPopup}>
          <div className="appPicContainer">
            {/*<img className="appPic" src={appInfo.imgLink} alt="" />*/}
          </div>
          <span className="appMiniLabel">{appInfo.nome} </span>
          {activeUser.name === "Admin" && (
            <>
              <span className="appMiniLabel">{appInfo.nome_empresa} </span>
              <span className="appMiniLabel">R${appInfo.preco},00 </span>
            </>
          )}
        </div>
        {activeUser.name === "Admin" ? (
          <>
            {trigger && (
              <PopupAdmin
                appInfo={fullAppInfo}
                appId={appInfo.id}
                trigger={trigger}
                setTrigger={setTrigger}
                activeUser={activeUser}
              />
            )}
          </>
        ) : (
          <>
            {trigger && (
              <Popup
                appInfo={fullAppInfo}
                appId={appInfo.id}
                trigger={trigger}
                setTrigger={setTrigger}
                activeUser={activeUser}
              />
            )}
          </>
        )}
      </>
    )
  );
};

export default AppMini;
