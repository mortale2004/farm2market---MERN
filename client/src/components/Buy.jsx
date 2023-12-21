import { useContext, useState, useEffect } from "react";
import AlertContext from "../context/alert/AlertContext";
import LoginContext from "../context/login/LoginContext";
import ProgressContext from "../context/progressbar/ProgressContext";
import ProductContext from "../context/product/ProductContext";
import ProductGrid from "./ProductGrid";

const Buy = () => {

  const a = useContext(AlertContext);
  const l = useContext(LoginContext);
  const p = useContext(ProgressContext);
  const pr = useContext(ProductContext);

  const [categories, setCategories] = useState([]);
  const [curCategory, setCurCategory] = useState("सर्व");


  useEffect(() => {
    l.checkUser();
    pr.getProducts();

    // eslint-disable-next-line
  }, [l.authToken])


  useEffect(() => {
    setCategories([...new Set(pr.products.map(pro => pro.category))]);
  }, [pr.products])

  const handleClick = (e) => {
    setCurCategory(e.currentTarget.id);
  }


  return (
    <main className="YourSellsMainCon">
            {a.showAlert()}

            

            <div className="btnContainer">
                <button className={`categoryBtn ${curCategory==="सर्व" && "activeBtn"}`} onClick={handleClick} id="सर्व">सर्व</button>
                {categories.map(c => <button className={`categoryBtn ${curCategory===c && "activeBtn"}`} key={c} id={c} onClick={handleClick} >{c}</button>)}
            </div>

            {curCategory === "सर्व" ? <ProductGrid  isBuy={true} title="सर्व" items={pr.products} /> : <ProductGrid isBuy={true}  title={curCategory} items={pr.products.filter(pro=>pro.category===curCategory)} />}




        </main>
  )
}

export default Buy
