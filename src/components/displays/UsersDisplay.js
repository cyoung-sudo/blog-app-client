import "./UsersDisplay.css";
// React
import { useState } from "react";
// Routing
import { Link } from "react-router-dom";
// Components
import Pagination from "../pagination/Pagination";

export default function UsersDisplay({ users }) {
  // Pagination
  const [pageContent, setPageContent] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <div id="usersDisplay">
      <div id="usersDisplay-pagination-wrapper">
        <Pagination 
          items={ users }
          itemsPerPage={ 10 }
          page={ page }
          setPage={ setPage }
          setPageContent={ setPageContent }/>
      </div>

      {(pageContent.length > 0) &&
        <ul id="usersDisplay-list">
          {pageContent.map((user, idx) => (
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