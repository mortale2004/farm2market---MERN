import "./css/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import logo from "../utils/images/logo.png"
import { CircleUserRound, LogOutIcon, Menu, X, Search} from "lucide-react";
import LoginContext from "../context/login/LoginContext";
import ProgressContext from "../context/progressbar/ProgressContext";
import LoadingBar from "react-top-loading-bar";



const NavBar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("/");
    const l = useContext(LoginContext);
    const ulRef = useRef();

    const p = useContext(ProgressContext);

    useEffect(() => {
        setActiveLink(location.pathname);
        if (window.screen.availWidth<600)
        {
            ulRef.current.style.transform = "translateX(-100vw)";
        }
        else
        {
            ulRef.current.style.transform = "translateX(0vw)";

        }
        p.setProgress(30);
        setTimeout(()=>{
            p.setProgress(50);
        }, 100);
        
        setTimeout(()=>{
            p.setProgress(100);
        }, 500);
        
        // eslint-disable-next-line
    }, [location]);


    const handleMenuClick = () => {
        ulRef.current.style.transform = "translateX(0vw)";
    }

    const handleCloseClick = () => {
        ulRef.current.style.transform = "translateX(-100vw)";
    }

    return (
        <nav className="navbar">
            <LoadingBar color='#66fcf1' progress={p.progress} onLoaderFinished={() => p.setProgress(0)}/>
            <Menu className="menu-btn" onClick={handleMenuClick} />
            <div className="leftNav">
                <Link to="/">
                    <div className="navHeadCon">
                        <img src={logo} alt="website logo" />
                        <h1>शेती ते बाजार</h1>
                    </div>
                </Link>
            </div>

            <ul ref={ulRef}>
                <X className="close-ul" onClick={handleCloseClick} />

                <li><Link className={` ${activeLink === "/" ? "active" : ""}`} to="/">मुख्यपृष्ठ</Link></li>
                <li><Link className={` ${activeLink === "/sell" ? "active" : ""}`} to="/sell">विक्री</Link></li>
                <li><Link className={` ${activeLink === "/buy" ? "active" : ""}`} to="/buy">खरेदी</Link></li>
                <li><Link className={` ${activeLink === "/contact" ? "active" : ""}`} to="/contact">संपर्क</Link></li>

                {window.screen.availWidth<600 &&(  l.loggedIn ? <li><Link to="/logout" className={` ${activeLink === "/logout" ? "active" : ""}`}>Log Out</Link></li>
                    : <>
                        <li><Link to="/register" className={` ${activeLink === "/register" ? "active" : ""}`}>Register</Link></li>
                        <li><Link to="/login" className={` ${activeLink === "/login" ? "active" : ""}`}>Login</Link></li></>)}
            </ul>

            <div className="rightNav">
                <div className="searchCon">
                    <Search/>
                    <input type="search" name="search" id="search" placeholder="येथे शोधा..." />
                </div>

                {l.loggedIn ?
                    <Link to="/logout">
                        <LogOutIcon className="logout" />
                    </Link>
                    :
                    <Link to="/login">
                        <CircleUserRound className={`loginCon ${activeLink === "/login" ? "activeBox" : ""} ${activeLink === "/signup" ? "activeBox" : ""}`} />
                    </Link>
                }
            </div>
        </nav>
    );
}
export default NavBar;


