import { useContext, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ProductContext from "../context/product/ProductContext";
const SearchBox = ()=> {

    const navigator = useNavigate();
    const pr = useContext(ProductContext);


    useEffect(() => {
      const id = setTimeout(() => {
        if (pr.query.length>0)
        {
          navigator("/searchproduct")
        }
        else
        {
          navigator("/");
        }
      }, 1500)
  
      return () => clearTimeout(id)
    }, [pr.query])
  
    return (
      <input
        autoFocus
        type='text'
        autoComplete='off'
        placeholder='येथे शोधा...'
        onChange={(e) => pr.setQuery(e.target.value)}
      />
    )
}

export default SearchBox;
