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
import Buy from "./components/Buy";
import Product from "./components/Product";
import SellFarmProduct from "./components/SellFarmProduct";
import SellProcessedProduct from "./components/SellProcessedProduct";
import Contact from "./components/Contact";
import SearchProduct from "./components/SearchProduct";
import Form from "./components/Form";
import YourSells from "./components/YourSells";
import UpdateFarmProduct from "./components/UpdateFarmProduct";
import UpdateProcessedProduct from "./components/UpdateProcessedProduct";


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
                <Route exact path="/yoursells" element={<YourSells />} />
                <Route exact path="/buy" element={<Buy />} />
                <Route exact path="/sellfarmproduct" element={<SellFarmProduct />} />
                <Route exact path="/sellprocessedproduct" element={<SellProcessedProduct />} />

                <Route exact path="/updatefarmproduct" element={<UpdateFarmProduct />} />
                <Route exact path="/updateprocessedproduct" element={<UpdateProcessedProduct />} />

                <Route exact path="/searchproduct" element={<SearchProduct />} />



                <Route exact path="/contact" element={<Contact />} />

                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/logout" element={<LogOut />} />
                <Route exact path="/form" element={<Form />} />
              </Routes>
            </ProductState>
          </LoginState>
        </AlertState>
      </ProgressState>
    </BrowserRouter>
  )
}

export default App;
