import { Navigate, Route, Routes } from "react-router-dom";
import { useContextValues } from "./hooks/useContext";
import { Event } from "./pages/Event";
import { Subscribe } from "./pages/Subscribe";
import { SubscribeTeacher } from "./pages/SubscribeTeacher";

export const Router = () => {
  const { sessionStorageTeacher, sessionStorageSubscriber } = useContextValues();

  return (
    <Routes>
      <>
        <Route path="/" element={<Subscribe />} />
        <Route path="/instructor" element={<SubscribeTeacher />} />
        <Route path="/login" element={<Subscribe />} />
        <Route path="/instructor/login" element={<SubscribeTeacher />} />
        <Route path="*" element={<Navigate to="/" />} />

        {sessionStorageSubscriber && (
          <>
            <Route path="/event/:subscriber" element={<Event />} />
            <Route path="/event/:subscriber/lesson/:lessonSlug" element={<Event />}/>
            <Route path="/event/*" element={<Navigate to={`/event/${sessionStorageSubscriber.slug}`} />} />
          </>
        )}
      </>
      {sessionStorageTeacher && (
        <>
          <Route path="instructor/event/:teacherSlug" element={<Event />} />
          <Route
            path="/instructor/event/:teacherSlug/lesson/:lessonSlug"
            element={<Event />}
          />
          <Route
            path="/instructor/event/:teacherSlug/*"
            element={
              <Navigate
                to={`/instructor/event/${sessionStorageTeacher.slug}`}
              />
            }
          />
        </>
      )}
    </Routes>
  );
};
