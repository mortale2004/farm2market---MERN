import { useEffect, useState } from "react";
import AlertContext from "./AlertContext";
import Alert from "../../components/Alert";

const AlertState = (props)=>{
    const [alert, setAlert] = useState({status: "", msg: [], isDone: false});

    useEffect(()=>{
        const r = setTimeout(()=>{
            setAlert({status:"", msg: [], isDone:true});
        }, 4000)
        return (()=>{
            clearTimeout(r);
        })
    }, [alert.isDone])

    const showAlert = ()=>{
        
        return <Alert alert={alert}/>
    }

    return (
        <AlertContext.Provider value={{alert, setAlert, showAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;