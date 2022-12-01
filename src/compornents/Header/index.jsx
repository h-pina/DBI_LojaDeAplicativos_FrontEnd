import "./styles.css";
import UserDropdown from "../UserDropdown";
import { Link } from "react-router-dom";

const Header = ({ setActiveUserCallback }) => {
  return (
    <header>
      <div className="headerContainer">
        <Link to="/">
          <div className="logo" />
        </Link>
        <Link to="/purchasesList" style={{ textDecoration: "none" }}>
          <div className="cartButton">
            <span>Meu Carrinho</span>
          </div>
        </Link>

        <div className="user">
          <UserDropdown setActiveUserCallback={setActiveUserCallback} />
        </div>
      </div>
    </header>
  );
};

export default Header;
