import React, { createContext, ReactNode, useState } from "react";
import { TypeLesson } from "../types/TypeLesson";

type sessionStorageValues = {
  name: string;
  email: string;
  slug: string;
};
type ContextType = {
  timeline: boolean;
  setTimeline: React.Dispatch<React.SetStateAction<boolean>>;
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  teacher: boolean;
  setTeacher: React.Dispatch<React.SetStateAction<boolean>>;
  lessonValues: TypeLesson;
  setLessonValues: React.Dispatch<React.SetStateAction<TypeLesson>>;
  apiTarget: string | undefined;
  setApiTarget: React.Dispatch<React.SetStateAction<string | undefined>>;
  sessionStorageTeacher: sessionStorageValues;
  setSessionStorageTeacher: React.Dispatch<React.SetStateAction<sessionStorageValues>>;
};

type ContextProviderTpe = {
  children: ReactNode;
};

export const Context = createContext({} as ContextType);

export const ContextProvider = (props: ContextProviderTpe) => {
  const [timeline, setTimeline] = useState(false);
  const [user, setUser] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [lessonValues, setLessonValues] = useState<TypeLesson>(
    {} as TypeLesson
  );
  const [sessionStorageTeacher, setSessionStorageTeacher] = useState<sessionStorageValues>(() => {
    const sessionStorageValue = sessionStorage.getItem("teacher");
    return sessionStorageValue ? JSON.parse(sessionStorageValue) : false;
  });
  const [apiTarget, setApiTarget] = useState<string | undefined>();

 


  return (
    <Context.Provider
      value={{
        timeline,
        setTimeline,
        user,
        setUser,
        teacher,
        setTeacher,
        lessonValues,
        setLessonValues,
        apiTarget,
        setApiTarget,
        sessionStorageTeacher,
        setSessionStorageTeacher
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
