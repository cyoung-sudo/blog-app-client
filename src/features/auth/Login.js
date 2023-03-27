import "./Login.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../appSlice";
import { setPopup } from "../../components/popup/slices/popupSlice";
// APIs
import * as authAPI from "../../apis/authAPI";
// Components
import AuthForm from "../../components/forms/AuthForm";

export default function Login(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();
    
    // Login user
    authAPI.login(username, password)
    .then(res => {
      if(res.data.success) {
        dispatch(setAuthUser(res.data.user));
        dispatch(setPopup({
          message: "Logged in",
          type: "success"
        }));

        // Redirect to home page
        navigate("/");
      } else {
        dispatch(setPopup({
          message: res.data.message,
          type: "error"
        }));
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <div id="login-form-wrapper">
        <AuthForm
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit={ handleSubmit }/>
      </div>
    </div>
  );
};