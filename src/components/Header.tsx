import Bar from "../assets/bar.svg";
import Close from "../assets/close.svg";
import { Logo } from "./Logo";
import { useTimeLine } from "../hooks/useTimeLine";

export const Header = () => {
  const { timeline, setTimeline } = useTimeLine();

  return (
    <header className="w-full p-5 flex items-center justify-center bg-gray-700 border-b border-gray-600 sm:justify-between sml:flex-col sml:items-start">
        <Logo />
      <div
        className="hidden items-center sm:flex hover:cursor-pointer"
        onClick={timeline ? () => setTimeline(false) : () => setTimeline(true)}
      >
        <h2>Aulas</h2>
        {!timeline ? (
          <img src={Bar} alt="sidebar" />
        ) : (
          <img src={Close} alt="closebar" />
        )}
      </div>
    </header>
  );
};
