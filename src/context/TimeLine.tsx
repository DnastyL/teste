import { createContext, ReactNode, useState } from "react";

type TimeLineContextType = {
    timeline: boolean;
    setTimeline:React.Dispatch<React.SetStateAction<boolean>>;
}

type TimeLineContextProviderTpe = {
    children: ReactNode;
}

export const TimeLineContext = createContext({} as TimeLineContextType);

export const TimeLineContextProvider = (props: TimeLineContextProviderTpe) => {
    const [timeline, setTimeline] = useState(false);

    return(
        <TimeLineContext.Provider value={{timeline, setTimeline}}>
            {props.children}
        </TimeLineContext.Provider>
    )
}

