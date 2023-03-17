import "./Users.css";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// APIs
import * as userAPI from "../../apis/userAPI";
import * as postAPI from "../../apis/postAPI";
// Components
import PostForm from "../../components/forms/PostForm";

export default function Profile() {
  // Controlled inputs
  const [postText, setPostText] = useState("");
  // Requested data
  const [user, setUser] = useState(null);
  // Redux state
  const { authUser }  = useSelector((state) => state.App);
  // Hooks
  const { id } = useParams();

  //----- Retrieve given user on load
  useEffect(() => {
    // Retrieve given user
    userAPI.getUser(id)
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      } else {
        console.log("Failed to retrieve user");
      }
    })
    .catch(err => console.log(err));
  }, []);

  //----- Submit post-form data
  const handleSubmit = e => {
    e.preventDefault();

    // Create post
    postAPI.create(id, postText)
    .then(res => {
      if(res.data.success) {
        console.log("Post created");
      } else {
        console.log("Failed to create post");
      }
    })
    .catch(err => console.log(err));
  };

  if(user) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{ user.username }'s Profile</h1>
        </div>

        {authUser && (id === authUser._id) &&
          <div id="profile-postForm-wrapper">
            <PostForm
              setPostText={ setPostText }
              handleSubmit={ handleSubmit }/>
          </div>
        }
      </div>
    );
  }
};