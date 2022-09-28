import { useEffect } from "react";
import { CheckCircle, Lock, Trash } from "phosphor-react";
import { isPast, format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { useContextValues } from "../hooks/useContext";
import axios from "axios";
import classNames from "classnames";
import ptBR from "date-fns/locale/pt-BR";

interface LessonProps {
  title: string;
  slug: string;
  avalaibleAt: Date;
  type: "live" | "class";
  teacherSlug?: string;
  setSubmitLesson: React.Dispatch<React.SetStateAction<boolean>>;
  setFormLesson: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteLesson: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Lesson = (props: LessonProps) => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const { teacherSlug } = useParams<{ teacherSlug: string }>();
  const { apiTarget } = useContextValues();

  const isLessonAvailable = isPast(props.avalaibleAt);
  const availableDateFormatted = format(
    props.avalaibleAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  const isActiveLesson = lessonSlug === props.slug;

  useEffect(() => {
    console.log(isActiveLesson);
    if (isActiveLesson && teacherSlug) {
      axios
        .get(`/vi/${apiTarget}/sddefault.jpg`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            props.setSubmitLesson(true);
          }
        })
        .catch((error) => {
          console.log(error);
          props.setSubmitLesson(false);
        });
    }
  }, [apiTarget, isActiveLesson]);

  return (
    <div>
      {lessonSlug && teacherSlug ? (
        <div className="flex items-center justify-between">
          <span className="text-gray-300 flex items-center gap-2">
            {availableDateFormatted}
            <span
              className={classNames("hover:cursor-pointer", {
                "hover:cursor-not-allowed opacity-20": !isActiveLesson,
              })}
              onClick={() => isActiveLesson && props.setDeleteLesson(true)}
            >
              <Trash size={20} color="red" />  
            </span>
          </span>
        </div>
      ) : (
        ""
      )}

      <Link
        to={
          !props.teacherSlug
            ? `/event/lesson/${props.slug}`
            : `/instructor/event/${props.teacherSlug}/lesson/${props.slug}`
        }
        onClick={() => props.setFormLesson(false)}
        className="hover:cursor-default"
      >
        <div className="group hover:cursor-pointer">
          <div
            className={classNames(
              " rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
              {
                "bg-green-500": isActiveLesson,
              }
            )}
          >
            <header className="flex items-center justify-between">
              {isLessonAvailable ? (
                <span
                  className={classNames(
                    "text-sm text-blue-500 font-medium flex items-center gap-2",
                    {
                      "text-white": isActiveLesson,
                      "text-blue-500": !isActiveLesson,
                    }
                  )}
                >
                  <CheckCircle size={20} />
                  Conteúdo Liberado
                </span>
              ) : (
                <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                  <Lock size={20} />
                  Em breve
                </span>
              )}

              <span
                className={classNames(
                  "text-xs rounded py-[0.125rem] px-2 text-white border font-bold lgx:w-[90px] text-center",
                  {
                    "border-white": isActiveLesson,
                    "border-green-300": !isActiveLesson,
                  }
                )}
              >
                {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
              </span>
            </header>
            <strong
              className={classNames("mt-5 block", {
                "text-white": isActiveLesson,
                "text-gray-200": !isActiveLesson,
              })}
            >
              {props.title}
            </strong>
          </div>
        </div>
      </Link>
    </div>
  );
};
