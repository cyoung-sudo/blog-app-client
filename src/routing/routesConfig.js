import App from "../App";
// Features
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
// Components
import Homepage from "../components/static/Homepage";
import NotFound from "../components/static/NotFound";

const routesConfig = [
  {
    path: "/", 
    element: <App/>,
    errorElement: <NotFound/>,
    children:[
      {
        path: "/",
        element: <Homepage/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      }
    ]
  }
];

export default routesConfig;