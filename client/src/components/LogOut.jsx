import { useContext, useEffect } from "react";
import LoginContext from "../context/login/LoginContext";
import { useNavigate } from "react-router-dom";

const LogOut = ()=>{
    const l = useContext(LoginContext);
    
    const navigator = useNavigate();
    useEffect(()=>{
        localStorage.removeItem("auth-token");
        l.setLoggedIn(false);
        l.setAuthToken(null);
        navigator("/login");
        // eslint-disable-next-line
    }, [])

    return (
        <>
        </>
    )
}
export default LogOut;