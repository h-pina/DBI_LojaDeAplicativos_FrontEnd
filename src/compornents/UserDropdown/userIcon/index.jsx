import "./styles.css";

const UserIcon = ({ userName, userBalance }) => {
  return (
    <div className="userContainer">
      <div className="userPic" />
      <div className="userInfoContainer">
        <span className="userLabel">{userName}</span>
        <span className="userLabel">R${userBalance}</span>
      </div>
    </div>
  );
};

export default UserIcon;
