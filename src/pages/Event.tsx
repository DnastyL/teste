import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { useTimeLine } from "../hooks/useTimeLine";

export const Event = () => {
  const { slug } = useParams<{ slug: string }>();
  const { timeline } = useTimeLine();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug && !timeline ? <Video lessonSlug={slug}/> : <div className="flex-1" />}
        <Sidebar />
      </main>
    </div>
  );
};
