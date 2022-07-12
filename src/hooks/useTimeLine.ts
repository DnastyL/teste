import { useContext } from "react"
import { TimeLineContext } from "../context/TimeLine"


export const useTimeLine = () =>{
    const value = useContext(TimeLineContext);

    return value;
}