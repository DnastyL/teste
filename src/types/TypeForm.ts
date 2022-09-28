import React, { ReactNode } from "react";
import { TypeTeacher } from "./TypeTeacher";

export interface TypeForm {
  name?: string;
  email?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  teacherValues?: TypeTeacher;
  setTeacherValues?: React.Dispatch<React.SetStateAction<TypeTeacher>> | undefined;
  handleSubscribe: React.FormEventHandler<HTMLFormElement>;
  children?: ReactNode;
  formLesson?: boolean;
}
