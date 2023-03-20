import "./UsersDisplay.css";

export default function UserPostsDisplay({ posts, handleDelete }) {
  return (
    <div id="userPostsDisplay">
      {(posts.length > 0) &&
        <ul id="userPostsDisplay-list">
          {posts.map((post, idx) => (
            <li key={ idx }>
              <div className="userPostsDisplay-text">{ post.text }</div>
              <div className="userPostsDisplay-date">Joined: { new Date(post.createdAt).toDateString() }</div>
              <div className="userPostsDisplay-options">
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};