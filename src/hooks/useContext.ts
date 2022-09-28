import { useContext } from "react"
import { Context } from "../context/Context"


export const useContextValues = () =>{
    const value = useContext(Context);

    return value;
}