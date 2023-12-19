import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./components/About";
// import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import AlertState from "./context/alert/AlertState";
import LoginState from "./context/login/LoginState";
import ProgressState from "./context/progressbar/ProgressState";
import Register from "./components/Register";
// import ContactUs from "./components/ContactUs";
import LogOut from "./components/LogOut";

const App = () => {
  return (
    <BrowserRouter>
      <ProgressState>
        <AlertState>
          <LoginState>
            <NavBar />
            <Routes>
              {/* <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/contactus" element={<ContactUs />  /> */}

              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/logout" element={<LogOut />} />
            </Routes>
          </LoginState>
        </AlertState>
      </ProgressState>
    </BrowserRouter>
  )
}

export default App;
