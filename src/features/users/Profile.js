import "./Profile.css";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, refresh } from "../../appSlice";
import { setPopup } from "../../components/popup/slices/popupSlice";
// APIs
import * as authAPI from "../../apis/authAPI";
import * as userAPI from "../../apis/userAPI";
import * as postAPI from "../../apis/postAPI";
// Components
import PostForm from "../../components/forms/PostForm";
import UserPostsDisplay from "../../components/displays/UserPostsDisplay";

export default function Profile() {
  // Controlled inputs
  const [postText, setPostText] = useState("");
  // Requested data
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  // Redux state
  const { authUser, refreshToggle }  = useSelector((state) => state.app);
  // Hooks
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Retrieve given user on load
  useEffect(() => {
    setUser(null);

    // Retrieve given user
    userAPI.getUser(id)
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      }
    })
    .catch(err => console.log(err));
  }, [id]);

  //----- Retrieve posts for given user on load
  useEffect(() => {
    setUserPosts(null);

    // Retrieve posts for given user
    postAPI.getForUser(id)
    .then(res => {
      if(res.data.success) {
        // Order from newest -> oldest
        let reversedPosts = res.data.posts.reverse();
        setUserPosts(reversedPosts);
      }
    })
    .catch(err => console.log(err));
  }, [id, refreshToggle]);

  //----- Submit post-form data
  const handleSubmit = e => {
    e.preventDefault();

    // Validations
    if(postText === "") {
      dispatch(setPopup({
        message: "Missing input field",
        type: "error"
      }));
    // Check limitations
    } else if(postText.length > 300) {
      dispatch(setPopup({
        message: "Posts are limited to 300 characters",
        type: "error"
      }));

      setPostText("");
    } else {
      // Check session status
      authAPI.getAuthUser()
      .then(res => {
        if(res.data.success) {
          // Create post
        postAPI.create(id, postText)
        .then(res2 => {
          if(res2.data.success) {
            dispatch(refresh());
            dispatch(setPopup({
              message: "Post created",
              type: "success"
            }));

            setPostText("");
          }
        })
        .catch(err => console.log(err));
        } else {
          //--- Expired session
          dispatch(setAuthUser(null));
          dispatch(setPopup({
            message: res.data.message,
            type: "error"
          }));

          // Redirect to home page
          navigate("/");
        }
      })
      .catch(err => console.log(err));
    }
  };

  //----- Delete given post
  const handleDelete = postId => {
    // Check session status
    authAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Delete image
        postAPI.deletePost(postId)
        .then(res2 => {
          if(res2.data.success) {
            dispatch(refresh());
            dispatch(setPopup({
              message: "Post deleted",
              type: "success"
            }));
          }
        })
        .catch(err => console.log(err));
      } else {
        //--- Expired session        
        dispatch(setAuthUser(null));
        dispatch(setPopup({
          message: res.data.message,
          type: "error"
        }));

        // Redirect to home page
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  }

  if(user && userPosts) {
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

        <div id="profile-userPosts-wrapper">
          <UserPostsDisplay 
            posts={ userPosts }
            handleDelete={ handleDelete }
            ownership={
              (authUser && (id === authUser._id)) ? true : false
            }/>
        </div>
      </div>
    );
  }
};