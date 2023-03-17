import "./PostForm.css"

export default function PostForm({ setPostText, handleSubmit }) {
  return (
    <form id="postForm" onSubmit={ handleSubmit }>
      <div className="postForm-field">
        <input
          onChange={e => setPostText(e.target.value)}
          type="text" 
          placeholder="text"/>
      </div>

      <div className="postForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};