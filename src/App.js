import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route
	  path="/"
	  element=<Outlet/>
      >
         <Route
	   path="/"
           element=<div>Login</div>
	 />
         <Route
	   path="memories"
           element=<div>Memories List</div>
	 />
      </Route>
     </Routes>
    </div>
  );
}

export default App;
