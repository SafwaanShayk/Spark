import { React } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/Theme";
function App() {
  // const homeRef = useRef(null);
  // const featuresRef = useRef(null);
  // const GuideRef = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
