import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Login from "./pages/Login";
import Memories from "./components/MemoryList";

import './App.css';

function App() {
  return (
    <div className="App-header">
     <Routes>
      <Route
	  path="/"
	  element=<Flex><Outlet/></Flex>
      >
         <Route
	   path="/"
           element=<Login/>
	 />
         <Route
	   path="memories"
           element=<Memories/>
	 />
      </Route>
     </Routes>
    </div>
  );
}

export default App;
