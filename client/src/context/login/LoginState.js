import LoginContext from "./LoginContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AlertContext from "../alert/AlertContext";


const LoginState = ({children})=>{

    const a = useContext(AlertContext);

    const URL = `${process.env.REACT_APP_API_URL}auth/getuser`;
    const [loggedIn, setLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("auth-token")));
    const navigator = useNavigate();
    const loc = useLocation();


    const checkUser = async ()=>{
        if (authToken)
        {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "auth-token" : authToken
                }
            });
            const json = await response.json();
            if (json.status==="success")
            {
                setLoggedIn(true);
                navigator(loc.pathname);
                a.setAlert({status:json.status, msg: ["Login Successful"], isDone: false})
            }
            else
            {
                a.setAlert({status:"success", msg: ["Logged Out Succussfully"], isDone: false})
                setLoggedIn(false);
                navigator("/register")

            }
        }
        else
        {
            setLoggedIn(false); 
            navigator("/register");
        }
    }    

    useEffect(()=>{
        checkUser();

        // eslint-disable-next-line
    },[])


    return (
        <LoginContext.Provider value={{loggedIn, setLoggedIn, checkUser, authToken, setAuthToken}}>
            {children}
        </LoginContext.Provider>
    )
}
export default LoginState;