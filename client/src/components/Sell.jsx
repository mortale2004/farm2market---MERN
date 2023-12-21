import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import LoginContext from "../context/login/LoginContext";
import "./css/Sell.css"

const Sell = () => {

    const l = useContext(LoginContext);
    
    useEffect(() => {
        l.checkUser();
        // eslint-disable-next-line
      }, [l.authToken])


    return (
        <main className="sellMainContainer">

            <h3>तुम्हाला काय विकायचे आहे?</h3>
            <div className="sellContainer">

                <Link to="/sellfarmproduct" className="sellTypeCon farmer">
                    <h1>शेतमाल</h1>
                </Link>

                <Link to="/sellprocessedproduct" className="sellTypeCon industry">
                    <h1>प्रक्रिया केलेले <br /> शेतीतील उत्पादन</h1>
                </Link>

                <Link to="/yoursells" className="sellTypeCon sell">
                    <h1>तुमची विक्री उत्पादने</h1>
                </Link>

            </div>

        </main>
    )
}

export default Sell;
