import { FormEvent, useEffect, useRef } from "react";
import { X } from "phosphor-react";
import { useCreateLessonMutation } from "../graphql/generated";
import { useContextValues } from "../hooks/useContext";
import { Form } from "./Form";
import { Button } from "./Button";
import { refreshPage } from "../hooks/useRefreshPage";
import { closeModal } from "../hooks/useCloseModal";

type ModalCreateLessonType = {
  formLesson: boolean;
  setFormLesson: React.Dispatch<React.SetStateAction<boolean>>;
  teacherSlug: string | undefined;
  isOpen: boolean;
};

export const ModalCreateLesson = ({
  formLesson,
  setFormLesson,
  teacherSlug,
  isOpen,
}: ModalCreateLessonType) => {
  const { lessonValues } = useContextValues();
  const [createLesson, { loading }] = useCreateLessonMutation();
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  async function handleSubscribeLesson(event: FormEvent) {
    event.preventDefault();

    try {
      await createLesson({
        variables: {
          title: lessonValues.title,
          slug: lessonValues.slug,
          videoId: lessonValues.videoId,
          lessonType: lessonValues.lessonType,
          description: lessonValues.description,
          teacherSlug: teacherSlug!,
          availableAt: lessonValues.availableAt,
        },
      });
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  }

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      ref={ref}
      onClick={(event) => {
        const isClose = setFormLesson;
        closeModal({ event, ref, isClose })}
      } 
      className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-75 z-[9999]"
    >
      <div className="p-8 bg-gray-700 border border-gray-500 rounded relative smll:w-full smll:h-full">
        <div className="p-3">
          <strong className="text-2xl m-6 block">
            Cadastre sua Aula no{" "}
            <strong className="text-green-500">Ignite-Lab</strong>
          </strong>
        </div>
        <Form handleSubscribe={handleSubscribeLesson} formLesson={formLesson}>
          {
            <Button
              type="submit"
              disabled={
                !lessonValues.availableAt ||
                !lessonValues.description ||
                !lessonValues.title ||
                !lessonValues.videoId ||
                !lessonValues.lessonType ||
                loading
              }
            >
              Cadastrar Aula
            </Button>
          }
        </Form>
        <span
          className="absolute right-[24px] top-[24px] hover:cursor-pointer"
          onClick={() => setFormLesson(false)}
        >
          <X size={24} />
        </span>
      </div>
    </div>
  );
};
