import "./styles.css";
import { useState, useEffect } from "react";

const PurchasesList = ({ userId }) => {
  const [purchasesList, setPurchasesList] = useState();

  useEffect(() => {
    async function fetchAll() {
      const res = await fetch(
        `http://localhost:5000/purchases/getUserPurchases/${userId}`
      );
      const resJson = await res.json();
      console.log(userId);
      console.log(resJson);
      setPurchasesList(resJson.purchases);
    }
    fetchAll();
  }, [userId]);
  return (
    purchasesList && (
      <>
        <h1>Compras</h1>
        <table>
          <tr>
            <th>Aplicativo</th>
            <th>Valor</th>
            <th>Data da Compra</th>
          </tr>
          {purchasesList.map((purchase) => (
            <>
              <tr>
                <td>{purchase.nome}</td>
                <td>{purchase.preco}</td>
                <td>{purchase.data_compra}</td>
              </tr>
            </>
          ))}
        </table>
      </>
    )
  );
};

export default PurchasesList;
