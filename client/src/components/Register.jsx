import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Register.css";
import { Link } from "react-router-dom";
import InputPassword from "./InputPassword";
import AlertContext from "../context/alert/AlertContext";
import ProgressContext from "../context/progressbar/ProgressContext";


const Register = () => {

  const a = useContext(AlertContext);
  const p = useContext(ProgressContext);

  const URL = `${process.env.REACT_APP_API_URL}auth/users/register`;
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "", mobile: "", password: "", cpassword: "", role: "" });
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    p.setProgress(30);
    if (user.password === user.cpassword) {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstname: user.firstname, lastname: user.lastname, email: user.email, mobile: user.mobile, password: user.password , role: user.role})
      });

      p.setProgress(65);

      const json = await response.json();

      p.setProgress(100);

      if (json.status === "success") {
        navigator("/login");
        a.setAlert({ status: "success", msg: ["यशस्वीरित्या नोंदणी केली"], isDone: false })
      }
      else {
        a.setAlert({ status: "danger", msg: json.result, isDone: false })
      }
    }
    else {
      a.setAlert({ status: "danger", msg: ["पासवर्ड आणि पुष्टी पासवर्ड जुळणे आवश्यक आहे!"], isDone: false })
    }

  }

  const handleChange = (e) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleSelectChange = (e)=>{
    setUser({...user, role: e.currentTarget.options[e.currentTarget.selectedIndex].value})
  }

  return (
    <main className="formMainCon">
      {a.showAlert()}
      <form onSubmit={handleSubmit}>
        <div className="formHeading">
          <h1>नोंदणी फॉर्म</h1>
        </div>
        <input required onChange={handleChange} value={user.firstname} type="firstname" name="firstname" id="firstname" placeholder="तुमचा पहिले नाव प्रविष्ट करा" />
        <input required onChange={handleChange} value={user.lastname} type="lastname" name="lastname" id="lastname" placeholder="तुमचा आडनाव प्रविष्ट करा" />
        <input required onChange={handleChange} value={user.email} type="email" name="email" id="email" placeholder="तुमचा ईमेल टाका" />
        <input required onChange={handleChange} value={user.mobile} type="mobile" name="mobile" id="mobile" placeholder="तुमचा मोबाईल नंबर टाका" />
        <select required={true} onChange={handleSelectChange}>
          <option value="">तुम्ही कोण आहात ? </option>
          <option value="farmer">शेतकरी</option>
          <option value="producer">उत्पादन निर्माता</option>
          <option value="seller">विक्रेता</option>
        </select>
        <InputPassword onChange={handleChange} value={user.password} name="password" id="password" placeholder="तुमचा पासवर्ड टाका" />
        <InputPassword onChange={handleChange} value={user.cpassword} name="cpassword" id="cpassword" placeholder="तुमच्या पासवर्डची पुष्टी करा" />
        <button>नोंदणी करा</button>
        <p>आधीच खाते आहे का ?<Link to="/login"> येथे लॉग इन करा </Link></p>
      </form>
    </main>
  );
}
export default Register;