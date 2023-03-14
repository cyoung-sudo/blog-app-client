import "./Signup.css";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as userAPI from "../../apis/userAPI";
// Components
import Form from "../../components/auth/Form";

export default function Signup(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();
  
  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();

    // Create user
    userAPI.create(username, password)
    .then(res => {
      if(res.data.success) {
        console.log("success");
        // Redirect to login page
        navigate("/login");
      } else {
        console.log("fail");
      }
    })
    .catch(err => console.log(err));
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