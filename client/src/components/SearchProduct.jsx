import { useContext, useEffect , useState} from "react"
import ProductContext from "../context/product/ProductContext";
import ProductGrid from "./ProductGrid";
import "./css/SearchProduct.css"


const SearchProduct = () => {
  const pr = useContext(ProductContext);
  const [searchdProducts, setSearchedProducts] = useState(pr.products);
  const [q, setQ] = useState("");

  useEffect(()=>{
    setQ(pr.query);
    setSearchedProducts(pr.products.filter(pr=> pr.title.includes(q)))
  },[q, pr.query]);


  return (
    <main className="searchProductMain">
      
      {searchdProducts.length===0 ? <h1>शोधलेले उत्पादन सापडले नाही</h1> : <ProductGrid isBuy={true} items={searchdProducts}/>}
    </main>
  )
}

export default SearchProduct
