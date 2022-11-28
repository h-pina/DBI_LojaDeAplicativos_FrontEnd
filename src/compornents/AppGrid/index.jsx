import AppMini from "../AppMini";
import "./styles.css";

const AppGrid = ({ appList, activeUser }) => {
  return (
    <main>
      {activeUser === "Admin" && (
        <div className="app addNewApp">
          <AppMini name="Adicionar Aplicativo" activeUser={activeUser} />
        </div>
      )}
      {appList.apps.map((app) => (
        <div className="app">
          <AppMini appInfo={app} />
        </div>
      ))}
    </main>
  );
};

export default AppGrid;
