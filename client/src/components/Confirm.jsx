import { useContext } from "react";
import "./css/Confirm.css";
import AlertContext from "../context/alert/AlertContext";
import ProgressContext from "../context/progressbar/ProgressContext";

const Confirm = ({ setConfirm, confirm, getUserProducts }) => {

  const a = useContext(AlertContext);
  const p = useContext(ProgressContext);

  const handleCancelClick = (e) => {
    if (e.target.className === "cancelBtn" || e.target.className === "confirmCon") {
      setConfirm({ active: false, id: null });
    }
  }


  const handleDeleteClick = async () => {
    p.setProgress(30);
    const URL = `${process.env.REACT_APP_API_URL}products/${confirm.id}`;
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      }
    });
    p.setProgress(80);

    const json = await response.json();

    if (json.status === "success") {
      a.setAlert({ status: "success", msg: ["हटवले शेतमाल हटवले..."], isDone: false })
      setConfirm({active: false, id: null});
      getUserProducts();
    }

    p.setProgress(100);
  }

  return (
    <div className="confirmCon" onClick={handleCancelClick}>
      <div className="confirmDiv">
        <h1>तुम्हाला नक्की हटवायचे आहे का ? </h1>
        <div className="buttonContainer">
          <button className="cancelBtn" onClick={handleCancelClick}>रद्द करा</button>
          <button className="deleteBtn" onClick={handleDeleteClick}>हटवा</button>
        </div>
      </div>
    </div>
  )
}

export default Confirm
