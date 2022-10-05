import React, { ReactNode } from "react";
import { TypeSubscribeValues } from "../components/RegisterSubscriber";
import { TypeTeacher } from "./TypeTeacher";

export interface TypeForm {
  subscribeValues?: TypeSubscribeValues;
  setSubscribeValues?: React.Dispatch<React.SetStateAction<TypeSubscribeValues>> | undefined;
  instructor?: boolean;
  teacherValues?: TypeTeacher;
  setTeacherValues?: React.Dispatch<React.SetStateAction<TypeTeacher>> | undefined;
  handleSubscribe: React.FormEventHandler<HTMLFormElement>;
  children?: ReactNode;
  formLesson?: boolean;
}
