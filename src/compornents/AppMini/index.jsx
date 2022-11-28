import Popup from "../Popup";
import { useState } from "react";
import "./styles.css";

const AppMini = ({ appInfo, activeUser }) => {
  const [trigger, setTrigger] = useState(false);

  const openPopup = () => {
    setTrigger(true);
  };

  return (
    <>
      <div className="appMini" onClick={openPopup}>
        <div className="appPicContainer">
          {/*<img className="appPic" src={appInfo.imgLink} alt="" />*/}
        </div>
        <span className="appMiniLabel">{appInfo.nome} </span>
        {activeUser === "Admin" && (
          <>
            <span className="appMiniLabel">{appInfo.nome_empresa} </span>
            <span className="appMiniLabel">{appInfo.preco} </span>
          </>
        )}
      </div>

      <Popup
        appId={appInfo.id}
        trigger={trigger}
        setTrigger={setTrigger}
        activeUser={activeUser}
      />
    </>
  );
};

export default AppMini;
