import "./css/Home.css";
import { useContext, useEffect, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import LoginContext from "../context/login/LoginContext";
import ProgressContext from "../context/progressbar/ProgressContext";
import ProductContext from "../context/product/ProductContext";

import Slider from "./Slider";

import ProductSlider from "./ProductSlider";



// import img from "../../public/images/slides/tomato.jpg"
const Home = () => {

  const a = useContext(AlertContext);
  const l = useContext(LoginContext);
  const p = useContext(ProgressContext);
  const pr = useContext(ProductContext);


//   const products = [
//     {
//       _id: "65822a8be724f79ba4e0a80a",
//       title: "tomato",
//       slug: "tomato",
//       description: "tomatoes are to sweet",
//       price: 23,
//       category: "fruit",
//       quantity: 2,
//       sold: 0,
//       images: [
//         "https://res.cloudinary.com/dingctcn2/image/upload/v1703029387/eo2r9dsbjg4mtfsg3uxy.jpg"
//       ],
//       __v: 0
//     }
//   ];



  useEffect(() => {
    l.checkUser();
    // eslint-disable-next-line
  }, [l.authToken])

  return (
    <>
      <main>
        {a.showAlert()}


        <Slider/>


        <ProductSlider title="फळे" items={pr.products.filter(product=>product.category==="fruit")}/>
        <ProductSlider title="पालेभाज्या" items={pr.products.filter(product=>product.category==="leafyvegetable")}/>
        <ProductSlider title="भाज्या" items={pr.products.filter(product=>product.category==="vegetable")}/>
        <ProductSlider title="सॉस" items={pr.products.filter(product=>product.category==="sause")}/>


        
      </main>
    </>
  );
}
export default Home;