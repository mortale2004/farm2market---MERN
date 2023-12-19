import "./css/Alert.css";

const Alert = ({alert})=>{

    return (
        <div className={`alert ${alert.status} ${alert.isDone ? "done" : "notdone"}`} >
            {alert.msg.map((m, i) => <p key={i}>{m}</p>)}
        </div>
    );
}
export default Alert;