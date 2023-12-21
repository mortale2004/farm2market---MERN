import { useContext } from "react";
import "./css/Confirm.css";
import AlertContext from "../context/alert/AlertContext";

const Confirm = ({ setConfirm, confirm, getUserProducts }) => {

  const a = useContext(AlertContext);

  const handleCancelClick = (e) => {
    if (e.target.className === "cancelBtn" || e.target.className === "confirmCon") {
      setConfirm({ active: false, id: null });
    }
  }


  const handleDeleteClick = async () => {
    const URL = `${process.env.REACT_APP_API_URL}products/${confirm.id}`;
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "auth-token": JSON.parse(localStorage.getItem("auth-token")),
      }
    });

    const json = await response.json();

    if (json.status === "success") {
      a.setAlert({ status: "success", msg: ["हटवले शेतमाल हटवले..."], isDone: false })
      setConfirm({active: false, id: null});
      getUserProducts();
    }


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
