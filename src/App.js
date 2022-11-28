import "./App.css";
import Header from "./compornents/Header";
import AppGrid from "./compornents/AppGrid";
import PurchasesList from "./compornents/PurchasesList";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Implement SearchBar search callbackl

function App() {
  const [activeUser, setActiveUser] = useState("");
  const [appList, setAppList] = useState();

  useEffect(() => {
    async function fetchAllApps() {
      const res = await fetch("http://localhost:5000/apps/listAllApps");
      const resJson = await res.json();
      setAppList(resJson);
    }
    fetchAllApps();
  }, []);
  return (
    appList && (
      <>
        <Router>
          <Header setActiveUserCallback={setActiveUser} />
          <Routes>
            <Route
              path="/"
              element={<AppGrid appList={appList} activeUser={activeUser} />}
            />
            <Route path="/purchasesList" element={<PurchasesList />} />
          </Routes>
        </Router>
      </>
    )
  );
}

export default App;
