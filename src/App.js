import "./App.css";
// React
import { useEffect } from "react";
// Routing
import { Outlet } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "./AppSlice";
// APIs
import * as authAPI from "./apis/authAPI";
// Components
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";

function App() {
  // Redux state
  const { authUser }  = useSelector((state) => state.App);
  // Hooks
  const dispatch = useDispatch();

  //----- Retrieve authenticated user on load
  useEffect(() => {
    authAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        dispatch(setAuthUser(res.data.user));
      } else {
        dispatch(setAuthUser(null));
      }
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id="app">
      <Navbar authUser={ authUser }/>
      <div id="app-content">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
