import "./App.css";
import Header from "./compornents/Header";
import AppGrid from "./compornents/AppGrid";
import { useEffect, useState } from "react";

//Implement SearchBar search callbackl
//Fetch data inside App???

function App() {
  /*const [appList, setAppList] = useState();

  useEffect(() => {
    async function fetchAllApps() {
      const res = await fetch("http://localhost:5000/apps/getAllApps");
      const resJson = await res.json();
      setAppList(resJson.rows);
    }
    fetchAllApps();
  }, []);*/

  return (
    <>
      <>
        <Header />
        <AppGrid />
      </>
    </>
  );
}

export default App;
