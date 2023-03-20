import "./Navbar.css";
// Routing
import { Link, NavLink, useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../appSlice";
import { setPopup } from "../../components/popup/slices/popupSlice";
// APIs
import * as authAPI from "../../apis/authAPI";

export default function Navbar({ authUser }) {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Logout user
  const handleLogout = () => {
    authAPI.logout()
    .then(res => {
      if(res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setPopup({
          message: "Logged out",
          type: "success"
        }));

        // Redirect to home page
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="navbar">
      <div id="navbar-logo">
        <Link to="/">Blog App</Link>
      </div>
      
      <ul id="navbar-links">
        <li>
          <NavLink
            to="users"
            end
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : undefined}>
            Users
          </NavLink>
        </li>

        {!authUser &&
          <li>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Signup
            </NavLink>
          </li>
        }

        {!authUser &&
          <li>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Login
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <NavLink
              to={ `users/${authUser._id}` }
              end
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Profile
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <NavLink
              to="settings"
              end
              className={({ isActive }) =>
                isActive ? "navbar-link-active" : undefined}>
              Settings
            </NavLink>
          </li>
        }

        {authUser &&
          <li>
            <button onClick={ handleLogout }>Logout</button>
          </li>
        }
      </ul>
    </div>
  );
};