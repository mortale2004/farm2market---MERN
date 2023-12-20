import { Link } from "react-router-dom";
import "./css/Sell.css"

const Sell = () => {
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

            </div>

        </main>
    )
}

export default Sell;
