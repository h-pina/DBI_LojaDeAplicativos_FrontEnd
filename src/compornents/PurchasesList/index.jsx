import "./styles.css";

const PurchasesList = () => {
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
