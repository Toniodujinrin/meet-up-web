import { createContext, useEffect } from "react";
import { } from "../api/config"; 
export const TokenContext = createContext()

const TokenContextProvider = ({children})=>{
    

    const checkForToken = ()=>{
        const token = window.localStorage.getItem("token")
        return typeof token == "string"
    }

    return(
        <TokenContext.Provider value={{checkForToken}}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenContextProvider