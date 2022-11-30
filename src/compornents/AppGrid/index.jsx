import AppMini from "../AppMini";
import "./styles.css";

const AppGrid = ({ appList, activeUser }) => {
  const adminAddnewApp = {
    img_link:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Qw4izG59ENBQITZpnFJBmbw42HLF3iH2l6q1IEFl44Bw87tJessAoiv9mabXllOZOMs&usqp=CAU",
    nome: "Adicionar Novo Aplicativo",
  };

  return (
    <main>
      {activeUser.name === "Admin" && (
        <div className="app addNewApp">
          <AppMini appInfo={adminAddnewApp} activeUser={activeUser} />
        </div>
      )}
      {appList.apps.map((app) => (
        <div className="app">
          <AppMini appInfo={app} activeUser={activeUser} />
        </div>
      ))}
    </main>
  );
};

export default AppGrid;
