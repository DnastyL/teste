import { useGetLessonsQuery } from "../graphql/generated";
import { useTimeLine } from "../hooks/useTimeLine";
import { Lesson } from "./Lesson";

export const Sidebar = () => {
  const { data } = useGetLessonsQuery();
  const { timeline } = useTimeLine();
  console.log(timeline);

  return (
    <aside
      className={
        !timeline
          ? "w-[348px] bg-gray-700 p-6 border-l border-gray-600 lgx:max-w-[250px] sm:hidden"
          : "w-full bg-gray-700 p-6 border-l border-gray-600 sm:block"
      }
    >
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de Aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              avalaibleAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          );
        })}
      </div>
    </aside>
  );
};
