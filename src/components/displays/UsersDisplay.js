import "./UsersDisplay.css";
// Routing
import { Link } from "react-router-dom";

export default function UsersDisplay({ users }) {
  return (
    <div id="usersDisplay">
      {(users.length > 0) &&
        <ul id="usersDisplay-list">
          {users.map((user, idx) => (
            <li key={ idx }>
              <div className="usersDisplay-username">
                <Link to={ `/users/${user._id}` }>{ user.username }</Link>
              </div>
              <div className="usersDisplay-date">Joined: { new Date(user.createdAt).toDateString() }</div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};