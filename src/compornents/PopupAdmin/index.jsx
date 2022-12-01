import "./styles.css";
import { useState } from "react";

const PopupAdmin = ({ appInfo, appId, trigger, setTrigger }) => {
  const SetTrigToFalse = () => {
    setTrigger(false);
  };
  const [nome, setNome] = useState("");
  const [nomeEmp, setNomeEmp] = useState("");
  const [desc, setDesc] = useState("");

  async function updateAppInfo() {
    appInfo.nome = nome;
    appInfo.nome_empresa = nomeEmp;
    appInfo.descricao = desc;

    await fetch(`http://localhost:5000/apps/editAppInfo`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appInfo),
    });
  }

  async function deleteApp() {
    await fetch(`http://localhost:5000/apps/deleteApp/${appInfo.id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
    });
  }

  return trigger && appInfo ? (
    <>
      <div className="popupContainer">
        <div className="popup">
          <button className="closePopupBtn" onClick={SetTrigToFalse}>
            X
          </button>
          <div className="appInfo">
            <input
              type="text"
              defaultValue={appInfo.nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              defaultValue={appInfo.nome_empresa}
              onChange={(e) => setNomeEmp(e.target.value)}
            />
            <input
              type="text"
              defaultValue={appInfo.descricao}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={updateAppInfo}>Save Edit</button>
            <button onClick={deleteApp}>Delete App</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default PopupAdmin;
