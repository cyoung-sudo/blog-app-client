import "./App.css";
// Routing
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <Outlet/>
    </div>
  );
}

export default App;
