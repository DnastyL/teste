import { X } from "phosphor-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteLessonMutation, usePublishLessonMutation } from "../graphql/generated";
import { Button } from "./Button";
import { refreshPage } from "../hooks/useRefreshPage";
import { closeModal } from "../hooks/useCloseModal";
import { useContextValues } from "../hooks/useContext";

type ModalUpdateLessonType = {
  isOpenDeleteLesson: boolean;
  isOpenSubmitLesson: boolean;
  setDeleteLesson: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitLesson: React.Dispatch<React.SetStateAction<boolean>>;
  teacherSlug: string;
  lessonSlug: string;
};

export const ModalUpdateLesson = ({
  isOpenDeleteLesson,
  isOpenSubmitLesson,
  setDeleteLesson,
  setSubmitLesson,
  teacherSlug,
  lessonSlug,
}: ModalUpdateLessonType) => {
  const { setTeacher } = useContextValues();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [deleteLesson, { loading } ] = useDeleteLessonMutation();
  const [publishLesson, { loading: load }] = usePublishLessonMutation();

  useEffect(() => {
    if (isOpenDeleteLesson || isOpenSubmitLesson) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpenDeleteLesson, isOpenSubmitLesson]);

  if (!isOpenDeleteLesson && !isOpenSubmitLesson) {
    return <></>;
  }


  async function deleteLessonSelected() {
    try {
      await deleteLesson({
        variables: {
          slug: lessonSlug,
        },
      });
      setDeleteLesson(!isOpenDeleteLesson);
      navigate(`/instructor/event/${teacherSlug}`);
      refreshPage();
      setTeacher(true);
    } catch (error) {
      throw new Error(`Failed to delete lesson ${error}`);
    }
  }

  async function publishLessonSelected(){
    try{
      await publishLesson({
        variables: {
          slug: lessonSlug,
        },
      });

      setSubmitLesson(!isOpenSubmitLesson);
      navigate(`/instructor/event/${teacherSlug}`);
      refreshPage();
      
    }
    catch(error){
      throw new Error(`Failed to publish lesson ${error}`)
    }
  }

  return (
    <div
      className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-75 z-[9999]"
      ref={ref}
      onClick={(event) => {
        const isClose = isOpenDeleteLesson ? setDeleteLesson : setSubmitLesson;
        closeModal({ event, ref, isClose });
      }}
    >
      {isOpenDeleteLesson && !isOpenSubmitLesson ? (
        <div className="p-8 bg-gray-700 border border-gray-500 rounded relative">
          <h2>Tem certeza que deseja excluir a aula?</h2>
          <div className="flex justify-between">
            <span>
              <Button onClick={deleteLessonSelected}>Sim</Button>
            </span>
            <span>
              <Button onClick={() => setDeleteLesson(!isOpenDeleteLesson)}>
                Não
              </Button>
            </span>
          </div>
          <span
            className="absolute right-[8px] top-[8px] hover:cursor-pointer"
            onClick={() => setDeleteLesson(!isOpenDeleteLesson)}
          >
            <X size={24} />
          </span>
        </div>
      ) : (
        <div className="p-8 bg-gray-700 border border-gray-500 rounded relative">
          <h2>Tem certeza que deseja publicar a lição?</h2>
          <div className="flex justify-between">
            <span>
              <Button onClick={publishLessonSelected} >Sim</Button>
            </span>
            <span>
              <Button onClick={() => setSubmitLesson(!isOpenSubmitLesson)}>
                Não
              </Button>
            </span>
          
          </div>
          <span
            className="absolute right-[8px] top-[8px] hover:cursor-pointer"
            onClick={() => setSubmitLesson(!isOpenSubmitLesson)}
          >
            <X size={24} />
          </span>
        </div>
      )}
    </div>
  );
};
