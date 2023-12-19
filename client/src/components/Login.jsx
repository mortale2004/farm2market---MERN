import { useState, useContext } from "react";
import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom"
import LoginContext from "../context/login/LoginContext";
import InputPassword from './InputPassword';
import AlertContext from "../context/alert/AlertContext";
import ProgressContext from "../context/progressbar/ProgressContext";

const Login = ()=>{

  const URL = `${process.env.REACT_APP_API_URL}auth/users/login`;
  const l = useContext(LoginContext)
  const a = useContext(AlertContext);
  const p = useContext(ProgressContext);

  const [user, setUser] = useState({email: "", password: ""});
  const navigator = useNavigate();

  const handleSubmit= async (e)=>{
    p.setProgress(40);
    e.preventDefault();
    const response = await fetch(URL, {
      method: "POST", 
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(user)
    });
    p.setProgress(60);
    const json = await response.json();
    p.setProgress(100);

    if (json.status==="success")
    {
      localStorage.setItem("auth-token", JSON.stringify(json.result[0]))
      l.setLoggedIn(true);
      l.setAuthToken(json.result[0]);
      navigator("/");
    }
    else
    {
      a.setAlert({status:"danger", msg: ["Enter Correct Username/Password"], isDone: false})
    }
  }

  const handleChange = (e)=>{
    setUser({...user, [e.currentTarget.name]: e.currentTarget.value})
  }

  return(
    <main className="formMainCon">
      {a.showAlert()}
      <form onSubmit={handleSubmit}>
          <div className="formHeading">
            <h1>साइन इन करा</h1>
          </div>
          <input required onChange={handleChange} value={user.email} type="email" name="email" id="email" placeholder="तुमचा ईमेल टाका"/>
          <InputPassword onChange={handleChange} value={user.password} name="password" id="password" placeholder="तुमचा पासवर्ड टाका"/>
          <button>साइन इन करा</button>
          <p>खाते नाही का ? <Link to="/register">येथे नोंदणी करा?</Link></p>
      </form>
    </main>
  );
}
export default Login;