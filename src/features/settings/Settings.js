import "./Settings.css";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../AppSlice";
// APIs
import * as authAPI from "../../apis/authAPI";
import * as userAPI from "../../apis/userAPI";

export default function Settings() {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Delete user data
  const handleDelete = () => {
    // Retrieve authenticated user
    authAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        let result = window.confirm("Are you sure you want to delete this account?");
        if(result) {
          let authUser = res.data.user;

          // Delete given user
          userAPI.deleteUser(authUser._id)
          .then(res2 => {
            if(res2.data.success) {
              // Logout user
              return authAPI.logout();
            } else {
              return { message: res2.data.message };
            }
          })
          .then(res2 => {
            if(res2.message) {
              console.log(res2.message);
            } else if(res2.data.success) {
              console.log("Logged out");
              dispatch(setAuthUser(null));

              // Redirect to home page
              navigate("/");
            } else {
              console.log("Failed to logout");
            }
          })
          .catch(err => console.log(err));
        }
      } else {
        console.log("Session expired");
        dispatch(setAuthUser(null));

        // Redirect to home page
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="settings">
      <div id="settings-header">
        <h1>Settings</h1>
      </div>

      <div id="settings-actions">
        <div className="settings-action">
          <div>Delete Account?</div>
          <button onClick={ handleDelete }>Delete</button>
        </div>
      </div>
    </div>
  );
};