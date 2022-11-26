import Popup from "../Popup";
import { useState } from "react";
import "./styles.css";

const AppMini = ({ img, name, dev, price }) => {
  const [trigger, setTrigger] = useState(false);

  const openPopup = () => {
    setTrigger(true);
  };

  return (
    <>
      <div className="appMini" onClick={openPopup}>
        <div className="appPic" />
        <span className="appMiniLabel">{name} </span>
        <span className="appMiniLabel">{dev} </span>
        <span className="appMiniLabel">{price} </span>
      </div>

      <Popup name={name} trigger={trigger} setTrigger={setTrigger} />
    </>
  );
};

export default AppMini;
