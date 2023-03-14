import "./Signup.css";
// React
import { useState } from "react";
// Components
import Form from "../../components/auth/Form";

export default function Signup(props) {
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
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-form-wrapper">
        <Form
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit={ handleSubmit }/>
      </div>
    </div>
  );
};