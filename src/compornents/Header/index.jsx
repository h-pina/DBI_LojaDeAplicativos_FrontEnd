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
        <input type="text" className="searchBar" />
        <Link to="/purchasesList">
          <div className="cartButton">C</div>
        </Link>

        <div className="user">
          <UserDropdown setActiveUserCallback={setActiveUserCallback} />
        </div>
      </div>
    </header>
  );
};

export default Header;
