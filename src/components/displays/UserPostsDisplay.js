import "./UserPostsDisplay.css";
// React
import { useState } from "react";
// Components
import Pagination from "../pagination/Pagination";

export default function UserPostsDisplay({ posts, handleDelete, ownership }) {
  // Pagination
  const [pageContent, setPageContent] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <div id="userPostsDisplay">
      <div id="userPostsDisplay-pagination-wrapper">
        <Pagination 
          items={ posts }
          itemsPerPage={ 10 }
          page={ page }
          setPage={ setPage }
          setPageContent={ setPageContent }/>
      </div>

      {(pageContent.length > 0) &&
        <ul id="userPostsDisplay-list">
          {pageContent.map((post, idx) => (
            <li key={ idx }>
              <div className="userPostsDisplay-text">{ post.text }</div>
              <div className="userPostsDisplay-date">Posted: { new Date(post.createdAt).toDateString() }</div>
              <div className="userPostsDisplay-options">
                {ownership && <button onClick={() => handleDelete(post._id)}>Delete</button>}
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};