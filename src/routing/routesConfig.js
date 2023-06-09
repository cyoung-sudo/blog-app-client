import App from "../App";
// Features
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Users from "../features/users/Users";
import Profile from "../features/users/Profile";
import Settings from "../features/settings/Settings";
// Components
import Homepage from "../components/static/Homepage";
import NotFound from "../components/static/NotFound";
import AuthWrapper from "../components/wrappers/AuthWrapper";

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
      },
      {
        path: "/users",
        children:[
          {
            index: true,
            element: <Users/>
          },
          {
            path: ":id",
            element: <Profile/>
          }
        ]
      },
      {
        path: "/settings",
        element: (
          <AuthWrapper>
            <Settings/>
          </AuthWrapper>
        )
      }
    ]
  }
];

export default routesConfig;