import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useContextValues } from "../hooks/useContext";
import { TypeForm } from "../types/TypeForm";
import { LessonType } from "../types/TypeLesson";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";

export const Form = ({
  subscribeValues,
  setSubscribeValues,
  handleSubscribe,
  formLesson,
  children,
  teacherValues,
  setTeacherValues,
}: TypeForm) => {
  const [formDate, setFormDate] = useState(new Date());
  const { lessonValues, setLessonValues } = useContextValues();
  const [instructor, setInstructor] = useState(false);

  useEffect(() => {
    if (location.pathname === "/instructor") {
      setInstructor(true);
    }
  }, [location]);

  useEffect(() => {
    const lessonSlugValue = lessonValues.title
      ?.toLocaleLowerCase()
      .replace(/[\s]/gm, "-");
    return setLessonValues({ ...lessonValues, slug: lessonSlugValue });
  }, [lessonValues.title]);

  function handleOnChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    if (name == "title" || name == "description") {
      const valueReplaced = value.replace(/^[\s]/g, "");
      return setLessonValues({ ...lessonValues, [name]: valueReplaced });
    }

    if (name == "lessonType") {
      if (value == "live" || value == "class") {
        let valueReplaced;
        value == "class"
          ? (valueReplaced = LessonType.Class)
          : (valueReplaced = LessonType.Live);
        return setLessonValues({ ...lessonValues, [name]: valueReplaced });
      }
    }
    if (name == "videoId") {
      const valueReplaced = value.replace(/[\s]/gi, "");
      return setLessonValues({ ...lessonValues, [name]: valueReplaced });
    }
  }

  function formatDate(date: Date, name: string) {
    let tzoffset = new Date().getTimezoneOffset() * 60000; //diferença de horário local com o horário UTC in milliseconds

    //pega o horário selecionado no form, subtrai pela diferença em milisegundos e converte para uma string no formato ISO 8601
    let localISOTime = new Date(date.getTime() - tzoffset).toISOString();

    setFormDate(date);
    return setLessonValues({ ...lessonValues, [name]: localISOTime });
  }

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full" autoComplete="off">
      {!formLesson ? (
        <>
          <div className="relative">
            <input
              className="peer"
              placeholder=""
              autoComplete="off"
              id="username"
              name="name"
              type="text"
              onChange={(event) => {
                const valueReplace = event.target.value
                  .replace(/^(\s)|\d/gm, "")
                  .trim();
                const slug = valueReplace
                  .toLocaleLowerCase()
                  .replace(/[^a-z]/gm, "-");
                !instructor
                  ? setSubscribeValues!({
                      ...subscribeValues!,
                      [event.target.name]: valueReplace,
                      ["slug"]: slug,
                    })
                  : setTeacherValues!({
                      ...teacherValues!,
                      [event.target.name]: valueReplace,
                      ["slug"]: slug,
                    });
              }}
            />
            <label
              htmlFor="username"
              className={classNames(
                "absolute bg-gray-700 rounded top-4 px-1 left-5 cursor-text  peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-top-2 transition-all",
                {
                  "-top-2 text-xs transition-all":
                    teacherValues?.name || subscribeValues?.name,
                }
              )}
            >
              Seu nome completo
            </label>
          </div>
          <div className="relative">
            <input
              className="peer"
              placeholder=""
              name="email"
              type="email"
              id="useremail"
              autoComplete="off"
              onChange={(event) => {
                const { name, value } = event.target;
                !instructor
                  ? setSubscribeValues!({
                      ...subscribeValues!,
                      [name]: value,
                    })
                  : setTeacherValues!({
                      ...teacherValues!,
                      [name]: value,
                    });
              }}
            />
            <label
              htmlFor="useremail"
              className={classNames(
                "absolute bg-gray-700 rounded top-4 px-1 left-5 cursor-text  peer-focus:text-xs peer-focus:text-blue-500 peer-focus:-top-2 transition-all",
                {
                  "-top-2 text-xs transition-all":
                    teacherValues?.email || subscribeValues?.email,
                }
              )}
            >
              Digite seu email
            </label>
          </div>
        </>
      ) : (
        <>
          <input
            className="bg-gray-900 rounded px-5 h-14 transition duration-200 outline-none  border-opacity-5"
            type="text"
            name="title"
            placeholder="Digite o título da aula"
            onChange={handleOnChange}
          />
          {!lessonValues.title && (
            <span className="text-red-800">Título indefinido</span>
          )}
          <input
            className="bg-gray-900 rounded px-5 h-14 focus:border-blue-500 transition duration-200 outline-none  border-opacity-5"
            type="text"
            name="videoId"
            autoComplete="off"
            placeholder="Video ID (YouTube)"
            maxLength={11}
            onChange={handleOnChange}
          />
          {!lessonValues.videoId && (
            <span className="text-red-800">ID do video indefinido</span>
          )}
          <input
            className="bg-gray-900 border-none rounded px-5 h-14 focus:border-blue-500 transition duration-200 outline-none border-opacity-5"
            type="text"
            name="description"
            autoComplete="off"
            placeholder="Descrição da Aula"
            onChange={handleOnChange}
          />
          {!lessonValues.description && (
            <span className="text-red-800">Descrição da aula indefinida</span>
          )}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-sm font-semibold">
              Escolha o tipo da Aula:
            </label>
            <select
              name="lessonType"
              className="bg-gray-700 outline-none rounded border-2 border-black border-opacity-50 appearance-none px-5 h-12"
              value={lessonValues.lessonType}
              onChange={handleOnChange}
            >
              <option value="0"></option>
              <option value="live">live</option>
              <option value="class">class</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-sm font-semibold">
              Disponibilização do Video:
            </label>
            <DatePicker
              name="availableAt"
              selected={formDate}
              placeholderText="16/08/2022,14:30"
              onChange={(date: Date) => formatDate(date, "availableAt")}
              showTimeSelect
              id="availableDate"
              dateFormat="dd/MM/yyyy"
            />
            {!lessonValues.availableAt && (
              <span className="text-red-800">Data Indefinida</span>
            )}
          </div>
        </>
      )}

      {children}
    </form>
  );
};
