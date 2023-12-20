import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import AlertState from "./context/alert/AlertState";
import LoginState from "./context/login/LoginState";
import ProgressState from "./context/progressbar/ProgressState";
import ProductState from "./context/product/ProductState";
import Register from "./components/Register";
import LogOut from "./components/LogOut";
import Sell from "./components/Sell";
import Product from "./components/Product";
import SellFarmProduct from "./components/SellFarmProduct";

// import About from "./components/About";
// import ContactUs from "./components/ContactUs";

const App = () => {
  return (
    <BrowserRouter>
      <ProgressState>
        <AlertState>
          <LoginState>
            <ProductState>
              <NavBar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product" element={<Product/>}/>
                <Route exact path="/sell" element={<Sell />} />
                <Route exact path="/sellfarmproduct" element={<SellFarmProduct />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/logout" element={<LogOut />} />
              </Routes>
            </ProductState>
          </LoginState>
        </AlertState>
      </ProgressState>
    </BrowserRouter>
  )
}

export default App;
