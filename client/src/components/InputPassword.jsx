import { Eye } from "lucide-react"
import { useRef } from "react"
const InputPassword = ({onChange, value, name, id, placeholder}) => {
    const input = useRef();
    const handleEyeClick = (e)=>{
        if (input.current.type==="password")
        {
            input.current.type = "text"
        }
        else
        {
            input.current.type = "password"

        }
    }
    return (
        <div className="passwordDiv">
        <Eye onClick={handleEyeClick}/>
        <input ref={input} required onChange = { onChange } value = { value } type = "password" name = {name} id = {id} placeholder = {placeholder}/>
        </div>
    )
}

export default InputPassword
