import AppMini from "../AppMini";
import "./styles.css";
import { useState } from "react";
import appListMock from "../../mocks/appListMock.json";

const AppGrid = () => {
  const [appList] = useState(appListMock.apps);
  return (
    <main>
      {appList.map((app) => (
        <div className="app">
          <AppMini name={app.nome} dev={app.nome_empresa} price={app.preco} />
        </div>
      ))}
    </main>
  );
};

export default AppGrid;
