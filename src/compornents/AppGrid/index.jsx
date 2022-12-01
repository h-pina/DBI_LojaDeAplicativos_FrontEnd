import AppMini from "../AppMini";
import "./styles.css";

const AppGrid = ({ appList, activeUser }) => {
  return (
    <main>
      {appList.apps.map((app) => (
        <div className="app">
          <AppMini appInfo={app} activeUser={activeUser} />
        </div>
      ))}
    </main>
  );
};

export default AppGrid;
