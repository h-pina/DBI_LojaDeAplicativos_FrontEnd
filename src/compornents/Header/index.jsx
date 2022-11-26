import "./styles.css";
import UserDropdown from "../UserDropdown";

const Header = () => {
  return (
    <header>
      <div className="headerContainer">
        <div className="logo" />
        <input type="text" className="searchBar" />
        <div className="user">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
