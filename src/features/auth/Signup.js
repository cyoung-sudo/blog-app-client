import "./Signup.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../../components/popup/slices/popupSlice";
// APIs
import * as userAPI from "../../apis/userAPI";
// Components
import AuthForm from "../../components/forms/AuthForm";

export default function Signup(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();

    // Validations
    if((username === "") || (password === "")) {
      dispatch(setPopup({
        message: "Missing input field",
        type: "error"
      }));
    // Check limitations
    } else if(username.length > 30) {
      dispatch(setPopup({
        message: "Usernames are limited to 30 characters",
        type: "error"
      }));
    } else if(password.length > 30) {
      dispatch(setPopup({
        message: "Passwords are limited to 30 characters",
        type: "error"
      }));
    } else {
      // Create user
      userAPI.create(username, password)
      .then(res => {
        if(res.data.success) {
          dispatch(setPopup({
            message: "Account created",
            type: "success"
          }));

          // Redirect to login page
          navigate("/login");
        } else {
          dispatch(setPopup({
            message: res.data.message,
            type: "error"
          }));
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-form-wrapper">
        <AuthForm
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit={ handleSubmit }/>
      </div>
    </div>
  );
};