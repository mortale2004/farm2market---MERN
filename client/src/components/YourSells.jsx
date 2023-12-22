import { useContext, useEffect, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import LoginContext from "../context/login/LoginContext";
import ProductContext from "../context/product/ProductContext";
import ProductGrid from "./ProductGrid";
import "./css/YourSells.css";
import Confirm from "./Confirm";


const YourSells = () => {
    const a = useContext(AlertContext);
    const l = useContext(LoginContext);
    const pr = useContext(ProductContext);

    const [categories, setCategories] = useState([]);
    const [curCategory, setCurCategory] = useState("सर्व");
    const [confirm, setConfirm] = useState({active: false, id: null});

    useEffect(() => {
        l.checkUser();
        pr.getUserProducts();

        // eslint-disable-next-line
    }, [l.authToken])


    useEffect(() => {
        setCategories([...new Set(pr.userProducts.map(pro => pro.category))]);
    }, [pr.userProducts])

    const handleClick = (e)=>{
        setCurCategory(e.currentTarget.id);
    }


    return (
        <main className="YourSellsMainCon">
            {a.showAlert()}

            

            {pr.userProducts.length>0 ? <> <h1>तुमच्याद्वारे विक्रीसाठी काढलेली उत्पादने </h1>
            {confirm.active&&<Confirm setConfirm={setConfirm} confirm={confirm} getUserProducts={pr.getUserProducts}/>}

            <div className="btnContainer">
                <button className={`categoryBtn ${curCategory==="सर्व" && "activeBtn"}`} onClick={handleClick} id="सर्व">सर्व</button>
                {categories.map(c => <button className={`categoryBtn ${curCategory===c && "activeBtn"}`} key={c} id={c} onClick={handleClick} >{c}</button>)}
            </div>

            {curCategory === "सर्व" ? <ProductGrid setConfirm={setConfirm} title="सर्व" items={pr.userProducts} /> : <ProductGrid setConfirm={setConfirm} title={curCategory} items={pr.userProducts.filter(pro=>pro.category===curCategory)} />}
            </> : <h1>कृपया विक्रीसाठी काही उत्पादने जोडा...</h1>
            }



        </main>
    )
}

export default YourSells;
