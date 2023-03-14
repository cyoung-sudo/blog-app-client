import "./Login.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
// Components
import Form from "../../components/auth/Form";

export default function Login(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();
  
  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();
    
    // Login user
    authAPI.login(username, password)
    .then(res => {
      if(res.data.success) {
        console.log("success");
        // Redirect to homepage
        navigate("/");
      } else {
        console.log("fail");
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
        <Form
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit={ handleSubmit }/>
      </div>
    </div>
  );
};