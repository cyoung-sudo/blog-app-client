import "./Navbar.css";
// Routing
import { Link, NavLink } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div id="navbar">
      <div id="navbar-logo">
        <Link to="/">Blog App</Link>
      </div>
      
      <ul id="navbar-links">
        <li>
          <NavLink
            to="signup"
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : undefined}>
            Signup
          </NavLink>
        </li>

        <li>
          <NavLink
            to="login"
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : undefined}>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};