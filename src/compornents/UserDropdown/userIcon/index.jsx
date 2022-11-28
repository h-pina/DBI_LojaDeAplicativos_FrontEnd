import "./styles.css";

const UserIcon = ({ userName }) => {
  return (
    <div className="userContainer">
      <div className="userPic" />
      <div className="userInfoContainer">
        <span className="userLabel">{userName}</span>
      </div>
    </div>
  );
};

export default UserIcon;
