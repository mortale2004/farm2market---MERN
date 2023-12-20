import ProductContext from "./ProductContext";
import AlertContext from "../alert/AlertContext";
import LoginContext from "../login/LoginContext";
import ProgressContext from "../progressbar/ProgressContext";
import { useEffect, useState, useContext } from "react";


const NotesState = (props)=>{

    const a = useContext(AlertContext);
    const l = useContext(LoginContext);
    const p = useContext(ProgressContext);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();

    const URL = `${process.env.REACT_APP_API_URL}products`;

    // // const addNote = async (note)=>{
    // //     p.setProgress(30);
    // //     const response = await fetch(`${URL}/addnote`, {
    // //         method: "POST",
    // //         body: JSON.stringify(note),
    // //         headers: {
    // //             "Content-Type" : "application/json",
    // //             "auth-token" : l.authToken
    // //         }
    // //     });
    // //     p.setProgress(50);
    // //     const json = await response.json();
    // //     p.setProgress(70);
    // //     getNotes();
    // //     a.setAlert({status:json.status, msg: json.result, isDone: false});
    // //     p.setProgress(100);
    // // }

    const getProducts = async ()=>{
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "auth-token" : l.authToken
            }
        });
        const json = await response.json();
        setProducts(json.result);
        console.log(json.result);   
    }

    // const deleteNote =  async (e)=>{
    //     p.setProgress(30);
    //     const id = e.currentTarget.parentElement.parentElement.id;
    //     const response = await fetch(`${URL}/deletenote/${id}`, {
    //         method: "POST",
    //         headers: {
    //             "auth-token" : l.authToken
    //         }
    //     });
    //     p.setProgress(50);

    //     const json = await response.json();
    //     p.setProgress(80);


    //     setNotes(notes.filter(n => n._id!==id));
    //     a.setAlert({status:"danger", msg: json.result, isDone: false});
    //     p.setProgress(100);

    // }
    
    // const editNote = async (note)=>{
    //     p.setProgress(10);
    //     await fetch(`${URL}/updatenote/${note._id}`, 
    //     {   
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type" : "application/json",
    //                 "auth-token" : l.authToken
    //             },
    //             body: JSON.stringify(note)
    //     });
    //     p.setProgress(30);
    //     for (let i=0; i<notes.length; i++)
    //     {
    //         if (note._id===notes[i]._id)
    //         {
    //             notes[i] = note;
    //             break;
    //         }
    //     }
    //     a.setAlert({status:"success", msg: ["Edited Successfully"], isDone:false});
    //     p.setProgress(100);

    // }

    
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
        <ProductContext.Provider value={{getProducts, products, product, setProduct}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default NotesState;