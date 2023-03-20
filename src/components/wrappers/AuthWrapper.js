// React
import { useEffect, useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../AppSlice";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";

export default function AuthWrapper({ children }) {
  // Requested data
  const [access, setAccess] = useState(false);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Check authentication on load
  useEffect(() => {
    authAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        setAccess(true);
      } else {
        console.log("Authentication required");

        dispatch(setAuthUser(null));
  
        // Redirect to home page
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(access) {
    return children;
  }
};