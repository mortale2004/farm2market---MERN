import "./css/Home.css";
import { useContext, useEffect } from "react";
import AlertContext from "../context/alert/AlertContext";
import LoginContext from "../context/login/LoginContext";
import ProductContext from "../context/product/ProductContext";

import Slider from "./Slider";  

import ProductSlider from "./ProductSlider";

const Home = () => {
  const a = useContext(AlertContext);
  const l = useContext(LoginContext);
  const pr = useContext(ProductContext);


  useEffect(() => {
    l.checkUser();
    // eslint-disable-next-line
  }, [l.authToken])

  return (
    <>
      <main className="homeMainCon">
        {a.showAlert()}

        <Slider className="sliderCon"/>
        <h1>शेतकऱ्यांची उत्पादने</h1>
        <ProductSlider title="फळे" items={pr.products.filter(product=>product.category==="फळे")}/>
        <ProductSlider title="पालेभाज्या" items={pr.products.filter(product=>product.category==="पालेभाज्या")}/>
        <ProductSlider title="भाज्या" items={pr.products.filter(product=>product.category==="भाज्या")}/>
        <h1>प्रक्रिया केलेली उत्पादने</h1>
        <ProductSlider title="सॉस" items={pr.products.filter(product=>product.category==="सॉस")}/>
        <ProductSlider title="रस" items={pr.products.filter(product=>product.category==="रस")}/>
        <ProductSlider title="कोरडे फळ" items={pr.products.filter(product=>product.category==="कोरडे फळ")}/>

        
      </main>
    </>
  );
}
export default Home;