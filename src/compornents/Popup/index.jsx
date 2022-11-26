import "./styles.css";

const Popup = ({ name, trigger, setTrigger }) => {
  const SetTrigToFalse = () => {
    setTrigger(false);
  };

  return trigger ? (
    <div className="popupContainer">
      <div className="popup">
        <h1>{name}</h1>
        <h2>Subtitulo</h2>
        <button onClick={SetTrigToFalse}>Close</button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
