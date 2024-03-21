import { useRef } from "react";
import "./App.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
function App() {
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const GuideRef = useRef(null);
  return (
    <div className="App">
      <Navbar featuresRef={featuresRef} GuideRef={GuideRef} homeRef={homeRef} />
      <Home featuresRef={featuresRef} GuideRef={GuideRef} homeRef={homeRef} />
    </div>
  );
}

export default App;
