import "./Navbar.css";
// React
import { useState } from "react";
// Routing
import { Link, NavLink, useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../appSlice";
import { setPopup } from "../../components/popup/slices/popupSlice";
// APIs
import * as authAPI from "../../apis/authAPI";
// Icons
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar({ authUser }) {
  // Collapse toggle
  const [collapse, setCollapse] = useState(true);
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

      <div id="navbar-collapse-toggle">
        <button onClick={() => setCollapse(state => !state)}>
          <GiHamburgerMenu size={30}/>
        </button>
      </div>
      
      {/*----- Expanded links -----*/}
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
      {/*----- /Expanded links -----*/}

      {/*----- Collapsed links -----*/}
      {!collapse &&
        <ul id="navbar-collapsed-links">
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
      }
      {/*----- /Collapsed links -----*/}
    </div>
  );
};