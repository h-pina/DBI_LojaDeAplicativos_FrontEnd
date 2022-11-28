import "./styles.css";
import { useState, useEffect } from "react";

const PurchasesList = () => {
  /*const [purchasesList, setPurchasesList] = useState();

  useEffect(() => {
    async function fetchAll() {
      const res = await fetch(
        `http://localhost:5000/purchases/ggetUserPurchaseset/${userId}`
      );
      const resJson = await res.json();
      setPurchasesList(resJson.app[0]);
    }
    fetchAll();
  }, []);*/
  return (
    <>
      <h1>Compras</h1>
      <table>
        <tr>
          <th>Aplicativo</th>
          <th>Valor</th>
          <th>Data da Compra</th>
        </tr>
        <tr>
          <td>Apple Music</td>
          <td>100kdol</td>
          <td>10-Aug-2000</td>
        </tr>
      </table>
    </>
  );
};

export default PurchasesList;
