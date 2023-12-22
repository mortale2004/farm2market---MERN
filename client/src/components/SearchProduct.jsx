import { useContext, useEffect , useState} from "react"
import ProductContext from "../context/product/ProductContext";
import ProductGrid from "./ProductGrid";
import "./css/SearchProduct.css"
import LoginContext from "../context/login/LoginContext";


const SearchProduct = () => {
  const l = useContext(LoginContext);
  const pr = useContext(ProductContext);
  const [searchdProducts, setSearchedProducts] = useState(pr.products);
  const [q, setQ] = useState("");


  useEffect(() => {
    l.checkUser();
    // eslint-disable-next-line
  }, [l.authToken])

  useEffect(()=>{
    setQ(pr.query);
    setSearchedProducts(pr.products.filter(pr=> pr.title.includes(q)));
    // eslint-disable-next-line
  },[q, pr.query]);


  return (
    <main className="searchProductMain">
      
      {searchdProducts.length===0 ? <h1>शोधलेले उत्पादन सापडले नाही</h1> : <ProductGrid isBuy={true} items={searchdProducts}/>}
    </main>
  )
}

export default SearchProduct
