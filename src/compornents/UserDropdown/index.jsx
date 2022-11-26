import "./styles.css";
import UserIcon from "./userIcon";
import userFetched from "../../mocks/userMock.json";
import { useEffect, useState } from "react";

const Dropdown = () => {
  const [dropdownOptions, setDropdownOptions] = useState(false);
  const [userList, setUserList] = useState(userFetched.users);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setSelectedUser(userList[0]);
  }, []);

  function setNewActiveUser(userId) {
    setSelectedUser(userList[userId]);
  }

  return (
    <div className="dropdown-container">
      {selectedUser && (
        <div
          className="active-item"
          onClick={() => setDropdownOptions(!dropdownOptions)}
        >
          {
            <UserIcon
              userName={selectedUser.name}
              userBalance={selectedUser.balance}
            />
          }
        </div>
      )}
      {dropdownOptions && (
        <div className="dropdown-content">
          {userList.map((user) =>
            user.name !== selectedUser.name ? (
              <div
                className="dropdown-item"
                onClick={() => {
                  setNewActiveUser(user.id);
                  setDropdownOptions(!dropdownOptions);
                }}
              >
                <UserIcon userName={user.name} userBalance={user.balance} />
              </div>
            ) : (
              ""
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
