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
      setPurchasesList(resJson.purchases);
    }
    fetchAll();
  }, [userId]);
  return (
    purchasesList && (
      <div className="purchases">
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
                <td>R${purchase.preco},00</td>
                <td>{purchase.data_compra.substring(0, 10)}</td>
              </tr>
            </>
          ))}
        </table>
      </div>
    )
  );
};

export default PurchasesList;
