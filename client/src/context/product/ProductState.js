import ProductContext from "./ProductContext";
import LoginContext from "../login/LoginContext";
import { useEffect, useState, useContext } from "react";


const NotesState = (props)=>{

    const l = useContext(LoginContext);

    const [query, setQuery] = useState('')
    const [products, setProducts] = useState([]);
    const [userProducts, setUserProducts] = useState([]);
    const [product, setProduct] = useState();
    

    const URL = `${process.env.REACT_APP_API_URL}products`;

    const getProducts = async ()=>{
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "auth-token" : l.authToken
            }
        });
        const json = await response.json();
        if (json.status==="success")
        {
            setProducts(json.result);
        }
    }


    const getUserProducts = async ()=>{
        const response = await fetch(`${URL}/user/products`, {
            method: "GET",
            headers: {
                "auth-token" : l.authToken
            }
        });
        const json = await response.json();
        if (json.status==="success")
        {
            setUserProducts(json.result);
        }
    }
    
    
    useEffect(()=>{
        if (l.loggedIn===true)
        {
            getProducts();
        }
        else
        {
            setProducts([])
        }
        // eslint-disable-next-line
    },[l.loggedIn])
 

    return (
        <ProductContext.Provider value={{getProducts, products, product, setProduct, getUserProducts, userProducts, setUserProducts, query, setQuery}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default NotesState;