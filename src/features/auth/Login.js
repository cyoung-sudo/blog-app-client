import "./Login.css";
// React
import { useState } from "react";
// Components
import Form from "../../components/auth/Form";

export default function Login(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();

    console.log(username);
    console.log(password);
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