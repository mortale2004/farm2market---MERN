import { useState } from "react";
import ProgressContext from "./ProgressContext";

const ProgressState = ({children})=>{
    const [progress, setProgress] = useState(0);

    return (
        <ProgressContext.Provider value={{progress, setProgress}}>
            {children}
        </ProgressContext.Provider>
    )
}

export default ProgressState;