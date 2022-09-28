import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModalCreateLesson } from "../components/ModalCreateLesson";
import { ModalUpdateLesson } from "../components/ModalUpdateLesson";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { Stage, useGetTeacherBySlugQuery } from "../graphql/generated";
import { useContextValues } from "../hooks/useContext";

export const Event = () => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const { teacherSlug } = useParams<{ teacherSlug: string }>();
  const navigate = useNavigate();
  const { timeline, sessionStorageTeacher } = useContextValues();
  const [formLesson, setFormLesson] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState(false);
  const [submitLesson, setSubmitLesson] = useState(false);
  const [teacherId, setTeacherId] = useState<string | undefined>("");
  const [stageLesson] = useState<Stage>(Stage.Draft);


  const { data } = useGetTeacherBySlugQuery({
    variables: {
      slug: teacherSlug,
    },
  });

  console.log(data);
  
  useEffect(() => {
    if(teacherSlug != undefined){
      verifiyRoute();
      console.log("teacherSlug: " + teacherSlug);
      console.log("sessionStorage: " + sessionStorageTeacher.slug)
      setTeacherId(data?.teacher?.id);
    }
  }, [data]);

 

  const verifiyRoute = useCallback(() =>{
    if(teacherSlug != sessionStorageTeacher.slug){
      return navigate(`/`)
    }
  }, [teacherSlug, sessionStorageTeacher]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {!timeline && (
          <Video lessonSlug={lessonSlug} stageLesson={stageLesson} />
        )}

        <ModalCreateLesson
          teacherSlug={teacherSlug as string}
          formLesson={formLesson}
          setFormLesson={setFormLesson}
          isOpen={formLesson}
        />
        <ModalUpdateLesson
          isOpenDeleteLesson={deleteLesson}
          isOpenSubmitLesson={submitLesson}
          setDeleteLesson={setDeleteLesson}
          setSubmitLesson={setSubmitLesson}
          teacherSlug={teacherSlug as string}
          lessonSlug={lessonSlug as string}
        />
        <Sidebar
          teacherSlug={teacherSlug}
          teacherId={teacherId}
          setSubmitLesson={setSubmitLesson}
          formLesson={formLesson}
          setFormLesson={setFormLesson}
          setDeleteLesson={setDeleteLesson}
        />
      </main>
    </div>
  );
};
