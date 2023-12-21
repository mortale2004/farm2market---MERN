import "./css/Home.css";
import { useContext, useEffect, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import LoginContext from "../context/login/LoginContext";
import ProgressContext from "../context/progressbar/ProgressContext";
import ProductContext from "../context/product/ProductContext";

import Slider from "./Slider";  

import ProductSlider from "./ProductSlider";

const Home = () => {
  const a = useContext(AlertContext);
  const l = useContext(LoginContext);
  const p = useContext(ProgressContext);
  const pr = useContext(ProductContext);


  useEffect(() => {
    l.checkUser();
    // eslint-disable-next-line
  }, [l.authToken])

  return (
    <>
      <main>
        {a.showAlert()}

        <Slider/>

        <ProductSlider title="फळे" items={pr.products.filter(product=>product.category==="फळे")}/>
        <ProductSlider title="पालेभाज्या" items={pr.products.filter(product=>product.category==="पालेभाज्या")}/>
        <ProductSlider title="भाज्या" items={pr.products.filter(product=>product.category==="भाज्या")}/>
        <ProductSlider title="सॉस" items={pr.products.filter(product=>product.category==="सॉस")}/>
        <ProductSlider title="पावडर" items={pr.products.filter(product=>product.category==="पावडर")}/>

        
      </main>
    </>
  );
}
export default Home;