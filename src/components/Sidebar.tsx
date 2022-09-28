import { PaperPlaneRight } from "phosphor-react";
import { useState } from "react";
import {
  useGetLessonByTeacherQuery,
  useGetLessonsQuery,
} from "../graphql/generated";
import { useContextValues } from "../hooks/useContext";
import { Button } from "./Button";
import { Lesson } from "./Lesson";
import classNames from "classnames";

type SiderbarType = {
  teacherSlug: string | undefined;
  teacherId: string | undefined;
  formLesson: boolean;
  setFormLesson: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteLesson: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitLesson: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sidebar = ({ teacherSlug, teacherId, formLesson, setFormLesson, setDeleteLesson, setSubmitLesson }: SiderbarType) => {
  const { data } = useGetLessonsQuery();
  const { data: lessonTeacherData } = useGetLessonByTeacherQuery({
    variables: {
      id: teacherId,
    },
  });

  const[buttonActive, setButtonActive] = useState(false);

 
  const { timeline } = useContextValues();

  return (
    <aside
      className={
        !timeline
          ? "w-[348px] bg-gray-700 p-6 border-l border-gray-600 lgx:max-w-[250px] sm:hidden"
          : "w-full bg-gray-700 p-6 border-l border-gray-600 sm:block"
      }
    >
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        {teacherSlug ? "Suas aulas: " : "Cronograma de Aulas"}
      </span>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          {!teacherSlug
            ? data?.lessons.map((lesson) => {
                return (
                  <Lesson
                    key={lesson.id}
                    title={lesson.title}
                    slug={lesson.slug}
                    avalaibleAt={new Date(lesson.availableAt)}
                    type={lesson.lessonType}
                    setSubmitLesson={setButtonActive}
                    setFormLesson={setFormLesson}
                    setDeleteLesson={setDeleteLesson}
                  />
                );
              })
            : lessonTeacherData?.lessons.map((lesson) => {
                return (
                  <Lesson
                    key={lesson.id}
                    title={lesson.title}
                    slug={lesson.slug}
                    avalaibleAt={new Date(lesson.availableAt)}
                    type={lesson.lessonType}
                    teacherSlug={teacherSlug}
                    setSubmitLesson={setButtonActive}
                    setFormLesson={setFormLesson}
                    setDeleteLesson={setDeleteLesson}
                  />
                );
              })}
        </div>
        {teacherSlug && !formLesson ? (
          <div
            className={
              !timeline
                ? "w-[300px] flex items-center gap-8 lgx:max-w-full lgx:gap-4"
                : " w-full flex items-center gap-3 "
            }
          >
            <span
              className={
                !timeline
                  ? "max-w-[234px] min-w-[200px] lgx:min-w-[130px]"
                  : "w-full "
              }
            >
              <Button onClick={() => setFormLesson(true)}>
                Adicionar Aula
              </Button>
            </span>
            <span className={
                  classNames("flex bg-green-500 w-[60px] h-[60px] mt-3 items-center justify-center rounded-full hover:cursor-pointer",
                  {
                   "opacity-60 hover:cursor-not-allowed": !buttonActive,
                  })}
               onClick={() => buttonActive && setSubmitLesson(true)}
        >
              <PaperPlaneRight size={28} />
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </aside>
  );
};
