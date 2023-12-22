import { useContext, useState } from "react";
import AlertContext from "../context/alert/AlertContext";
import ProgressContext from "../context/progressbar/ProgressContext";


const Contact = () => {


    const a = useContext(AlertContext);
    const p = useContext(ProgressContext);

    const URL = `${process.env.REACT_APP_API_URL}contact`;
    const [user, setUser] = useState({ name: "", email: "", mobile: "", message: "" });

    const handleChange = (e) => {
        setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        p.setProgress(30);

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        p.setProgress(65);

        const json = await response.json();

        p.setProgress(100);

        if (json.status === "success") {
            a.setAlert({ status: "success", msg: ["यशस्वीरित्या संदेश पाठवला..."], isDone: false })
            setUser({ name: "", email: "", mobile: "", message: "" });
        }
        else {
            a.setAlert({ status: "danger", msg: json.result, isDone: false })
        }

    }

    return (
        <main className="formMainCon">
            {a.showAlert()}
            <form onSubmit={handleSubmit}>
                <div className="formHeading">
                    <h1>संपर्क फॉर्म</h1>
                </div>
                <input required onChange={handleChange} value={user.name} type="name" name="name" id="name" placeholder="तुमचे नाव प्रविष्ट करा" />
                <input required onChange={handleChange} value={user.email} type="email" name="email" id="email" placeholder="तुमचा ईमेल टाका" />
                <input required onChange={handleChange} value={user.mobile} type="mobile" name="mobile" id="mobile" placeholder="तुमचा मोबाईल नंबर टाका" />
                <textarea required onChange={handleChange} value={user.message} name="message" id="message" placeholder="तुमचा संदेश टाका" ></textarea>
                <button>संदेश पाठवा</button>
            </form>
        </main>
    )
}

export default Contact

