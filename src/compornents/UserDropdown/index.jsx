import "./styles.css";
import UserIcon from "./userIcon";
import { useEffect, useState } from "react";

const Dropdown = ({ setActiveUserCallback }) => {
  const [dropdownOptions, setDropdownOptions] = useState(false);
  const [userList, setUserList] = useState();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      const res = await fetch(`http://localhost:5000/users/listAllUsers`);
      const resJson = await res.json();
      setUserList(resJson.users);
      setSelectedUser(resJson.users[0]);
    }
    fetchAll();
  }, []);

  function setNewActiveUser(userId) {
    let newSelectedUser = userList.find((user) => user.id === userId);
    setSelectedUser(newSelectedUser);
    setActiveUserCallback(newSelectedUser);
  }

  return (
    userList &&
    selectedUser && (
      <div className="dropdown-container">
        {selectedUser && (
          <div
            className="active-item"
            onClick={() => setDropdownOptions(!dropdownOptions)}
          >
            {<UserIcon userName={selectedUser.name} />}
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
                  <UserIcon userName={user.name} />
                </div>
              ) : (
                ""
              )
            )}
          </div>
        )}
      </div>
    )
  );
};

export default Dropdown;
