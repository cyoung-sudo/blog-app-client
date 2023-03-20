import "./Users.css";
// React
import { useState, useEffect } from "react";
// Components
import UsersDisplay from "../../components/displays/UsersDisplay";
// APIs
import * as userAPI from "../../apis/userAPI";

export default function Users() {
  // Requested data
  const [users, setUsers] = useState(null);

  //----- Retrieve all users on load
  useEffect(() => {
    // Retrieve all users
    userAPI.getAll()
    .then(res => {
      if(res.data.success) {
        // Order from newest -> oldest
        let reversedUsers = res.data.users.reverse();
        setUsers(reversedUsers);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(users) {
    return (
      <div id="users">
        <div id="users-header">
          <h1>Users</h1>
        </div>
  
        <div id="users-list-wrapper">
          <UsersDisplay users={ users }/>
        </div>
      </div>
    );
  }
};