import { Navigate, Route, Routes } from "react-router-dom";
import { useContextValues } from "./hooks/useContext";
import { Event } from "./pages/Event";
import { Subscribe } from "./pages/Subscribe";
import { SubscribeTeacher } from "./pages/SubscribeTeacher";



export const Router = () => {
  const { teacher, user, sessionStorageTeacher } = useContextValues();



  console.log("teacher is: " + teacher);
  console.log("user is: " + user);
  console.log(sessionStorageTeacher);

  return (
    <Routes>
      <>  
        <Route path="/" element={<Subscribe />} />
        <Route path="/instructor" element={<SubscribeTeacher />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/lesson/:lessonSlug" element={<Event />} />
        <Route path="/instructor/login" element={<SubscribeTeacher />}/> 

        <Route path="*" element={<Navigate to="/" />}
        />
      </>

      {sessionStorageTeacher && (
        <>
          <Route path="instructor/event/:teacherSlug" element={<Event />} />
          <Route
            path="/instructor/event/:teacherSlug/lesson/:lessonSlug"
            element={<Event/>}
          />
          <Route
            path="/instructor/event/:teacherSlug/*"
            element={<Navigate to={`/instructor/event/${sessionStorageTeacher.slug}`} />}
          />
        </>
      )}
    </Routes>
  );
};
