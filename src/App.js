import { React, useRef } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  // const homeRef = useRef(null);
  // const featuresRef = useRef(null);
  // const GuideRef = useRef(null);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
